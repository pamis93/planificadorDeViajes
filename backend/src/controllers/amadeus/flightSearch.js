import amadeus from './amadeusApiKey.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import { parseDuration, parseTime } from '../../utils/momentParser.js';

const processFlightOffers = (flightOffers) => {
  return flightOffers.map((flight) => ({
    id: flight.id,
    price: {
      total: flight.price.total,
      currency: flight.price.currency,
    },
    itinerary: flight.itineraries[0].segments.map((segment) => ({
      departure: {
        airport: segment.departure.iataCode,
        terminal: segment.departure.terminal,
        time: {
          raw: segment.departure.at,
          date: parseTime(segment.departure.at)[1],
          time: parseTime(segment.departure.at)[0],
        },
      },
      arrival: {
        airport: segment.arrival.iataCode,
        terminal: segment.arrival.terminal,
        time: {
          date: parseTime(segment.arrival.at)[1],
          time: parseTime(segment.arrival.at)[0],
        },
      },
      carrier: {
        code: segment.carrierCode,
        flightNumber: segment.number,
      },
      aircraft: segment.aircraft.code,
      duration: parseDuration(segment.duration),
      stops: segment.numberOfStops,
    })),
    totalDuration: parseDuration(flight.itineraries[0].duration),
    travelClass: flight.travelerPricings[0].fareDetailsBySegment[0].cabin,
  }));
};

const extractPriceRange = (flightOffers) => {
  if (!flightOffers || flightOffers.length === 0) {
    return {
      minPrice: null,
      maxPrice: null,
    };
  }

  const prices = flightOffers.map((offer) => parseFloat(offer.price.total));

  return {
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    currency: flightOffers[0].price.currency,
  };
};

const flightSearch = async (req, res, next) => {
  try {
    const queryParams = req.query;
    const amadeusMappings = {
      originCode: 'originLocationCode',
      destinationCode: 'destinationLocationCode',
      departureDate: 'departureDate',
      adults: 'adults',
      totalResults: 'max',
      children: 'children',
      infants: 'infants',
      travelClass: 'travelClass',
      currencyCode: 'currencyCode',
      nonStop: 'nonStop',
      maxPrice: 'maxPrice',
      returnDate: 'returnDate',
    };

    const searchParams = Object.keys(queryParams).reduce((params, key) => {
      if (amadeusMappings[key]) {
        params[amadeusMappings[key]] = queryParams[key];
      }
      return params;
    }, {});

    const requiredParams = [
      'originLocationCode',
      'destinationLocationCode',
      'departureDate',
      'adults',
    ];
    const missingParams = requiredParams.filter(
      (param) => !searchParams[param]
    );

    if (missingParams.length > 0) {
      throw generateErrorsUtils(
        `'Faltan parámetros obligatorios ${missingParams.join(', ')}'`,
        400
      );
    }

    const response =
      await amadeus.shopping.flightOffersSearch.get(searchParams);

    const resume = response.result.data.map((flight) => ({
      id: flight.id,
      origin: flight.itineraries[0]?.segments[0]?.departure?.iataCode,
      destination:
        flight.itineraries[0]?.segments.slice(-1)[0]?.arrival?.iataCode,
      departureDate: parseTime(
        flight.itineraries[0]?.segments[0]?.departure?.at
      )[1],
      arrivalDate: parseTime(
        flight.itineraries[0]?.segments.slice(-1)[0]?.arrival?.at
      )[1],
      aeroline: flight.itineraries[0]?.segments[0]?.carrierCode,
      // duration: flight.itineraries[0]?.duration,
      duration: parseDuration(flight.itineraries[0]?.duration),
      price: flight.price?.total,
      currency: flight.price?.currency,
    }));

    const processed = processFlightOffers(response.result.data);
    const priceRange = extractPriceRange(response.result.data);

    res.send({
      raw: response?.result,
      resume: resume,
      processed: processed,
      priceRange: priceRange,
    });
  } catch (error) {
    next(error);
    // res.status(500).send({ error: error.message });
  }
};

export default flightSearch;
