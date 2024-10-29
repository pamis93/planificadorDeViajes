import Amadeus from 'amadeus';
import amadeus from "./amadeusApiKey.js";

const cityAndAirportSearch = async (req, res) => {
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

export default cityAndAirportSearch;