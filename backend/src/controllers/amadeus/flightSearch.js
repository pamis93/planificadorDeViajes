import Amadeus from 'amadeus';
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



/** cosas que añadir a la descripción:
 * - paradas/escala
- escala: condicional, si el numero de areo linea es diferente en cada segmento, cuenta como parada, si es la misma aparece el valor de paradas que devuelve la api.
 */

        const flights = response.result.data.map(flight => ({
            id: flight.id,
            origin: flight.itineraries[0]?.segments[0]?.departure?.iataCode, 
            destination: flight.itineraries[0]?.segments.slice(-1)[0]?.arrival?.iataCode, 
            departureDate: flight.itineraries[0]?.segments[0]?.departure?.at,
            arrivalDate: flight.itineraries[0]?.segments[0]?.arrival?.at,
            aeroline: flight.itineraries[0]?.segments[0]?.carrierCode,
            duration: flight.itineraries[0]?.segments[0]?.duration,
            price: flight.price?.total,
        }));

        res.send(flights);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export default flightSearch;