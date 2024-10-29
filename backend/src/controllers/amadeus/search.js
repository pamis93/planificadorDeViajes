import Amadeus from 'amadeus';
import amadeus from "./amadeusApiKey.js";
export const combinedSearch = async (req, res) => {
    try {
        const { originCode, destinationCode, dateOfDeparture, keyword, adults, totalResults } = req.query;

        const locationPromise = amadeus.referenceData.locations.get({
            keyword: keyword,
            subType: Amadeus.location.any,
        });

        const flightPromise = amadeus.shopping.flightOffersSearch.get({
            originLocationCode: originCode,
            destinationLocationCode: destinationCode,
            departureDate: dateOfDeparture,
            adults: adults, 
            max: totalResults, // cantidad máx de vuelos que se muestran
        });

        const [locationResponse, flightResponse] = await Promise.all([locationPromise, flightPromise]);

        // Filtrar los datos relevantes de las ubicaciones
        const locations = locationResponse.result.data.map(location => ({
            name: location.name,
            iataCode: location.iataCode,
            cityName: location.address.cityName,
            countryName: location.address.countryName,
            latitude: location.geoCode.latitude,
            longitude: location.geoCode.longitude,
        }));

        // Filtrar los datos relevantes de los vuelos, accediendo a los segmentos
        const flights = flightResponse.result.data.map(flight => ({
            id: flight.id,
            origin: flight.itineraries[0]?.segments[0]?.departure?.iataCode, // Primer segmento de salida
            destination: flight.itineraries[0]?.segments.slice(-1)[0]?.arrival?.iataCode, // Último segmento de llegada
            departureDate: flight.itineraries[0]?.segments[0]?.departure?.at,
            price: flight.price?.total,
        }));

        // Enviar la respuesta simplificada
        res.send({
            locations,
            flights,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};