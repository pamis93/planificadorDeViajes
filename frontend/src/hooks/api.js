import useFetch from "./useFetch";

export const useFlightSearch = ({ origin, destination, departureDate, adults }) => {
    const params = { 
        originCode: origin, 
        destinationCode: destination, 
        dateOfDeparture: departureDate, 
        adults,
        totalResults: 10 
    };
    
    const content = useFetch('/flight-search');
    return content;  // Agrega un or por defecto a content
};

