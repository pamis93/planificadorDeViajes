import "dotenv/config";
import Amadeus from 'amadeus';

const amadeusController = async (req, res, next) => {
    try {
        const amadeus = new Amadeus({
            clientId: process.env.AMADEUS_API_KEY,
            clientSecret: process.env.AMADEUS_API_SECRET,
        });

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

        // Ejecutamos ambas promesas y respondemos cuando ambas se hayan resuelto
        Promise.all([locationPromise, flightPromise])
            .then(([locationResponse, flightResponse]) => {
                res.send({
                    locations: locationResponse.result,
                    flights: flightResponse.result,
                });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });

    } catch (error) {
        next(error);
    }
};

export default amadeusController;
