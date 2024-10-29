import "dotenv/config";
import Amadeus from 'amadeus';

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_API_KEY,
    clientSecret: process.env.AMADEUS_API_SECRET,
});

// Controlador para buscar ciudades o aeropuertos
export const cityAndAirportSearch = async (req, res) => {
    try {
        const parameter = req.params.parameter;
        const response = await amadeus.referenceData.locations.get({
            keyword: parameter,
            subType: Amadeus.location.any,
        });
        res.send(response.result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Controlador para buscar vuelos
export const flightSearch = async (req, res) => {
    try {
        const { originCode, destinationCode, dateOfDeparture } = req.query;
        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: originCode,
            destinationLocationCode: destinationCode,
            departureDate: dateOfDeparture,
            adults: '1',
            max: '7',
        });
        res.send(response.result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Controlador combinado para buscar ciudades/aeropuertos y vuelos
export const combinedSearch = async (req, res) => {
    try {
        const { originCode, destinationCode, dateOfDeparture, keyword } = req.query;

        const locationPromise = amadeus.referenceData.locations.get({
            keyword: keyword,
            subType: Amadeus.location.any,
        });

        const flightPromise = amadeus.shopping.flightOffersSearch.get({
            originLocationCode: originCode,
            destinationLocationCode: destinationCode,
            departureDate: dateOfDeparture,
            adults: '1',
            max: '7',
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
