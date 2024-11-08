import amadeus from "./amadeusApiKey.js";


const flightSearch = async (req, res) => {
    try {
        const { originCode, destinationCode, dateOfDeparture, adults, totalResults, } = req.query;
        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: originCode,
            destinationLocationCode: destinationCode,
            departureDate: dateOfDeparture,
            adults: adults,
            max: totalResults,

        });


       /*  const flights = response.result.data.map(flight => ({
            id: flight.id,
            origin: flight.itineraries[0]?.segments[0]?.departure?.iataCode, 
            destination: flight.itineraries[0]?.segments.slice(-1)[0]?.arrival?.iataCode, 
            departureDate: flight.itineraries[0]?.segments[0]?.departure?.at,
            arrivalDate: flight.itineraries[0]?.segments[0]?.arrival?.at,
            aeroline: flight.itineraries[0]?.segments[0]?.carrierCode,
            duration: flight.itineraries[0]?.duration,
            price: flight.price?.total,
        })); */

        res.send(response?.result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export default flightSearch;