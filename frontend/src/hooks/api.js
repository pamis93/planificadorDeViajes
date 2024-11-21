import { useEffect, useMemo } from 'react';
import { useFlightSearchParams } from '../context/FlightSearchParamsContext';
import useFetch from './useFetch';

// export const useFlightSearch = ({
//   origin,
//   destination,
//   departureDate,
//   adults,
// }) => {
//   const params = {
//     originCode: origin,
//     destinationCode: destination,
//     dateOfDeparture: departureDate,
//     adults,
//     totalResults: 10,
//   };

//   const content = useFetch('/flight-search');
//   return content; // Agrega un or por defecto a content
// };

export const useCityAndAirportSearch = (parameter) => {
  const content = useFetch(`/city-and-airport-search/:${parameter}`) || {
    data: [],
  };
  return content;
};

export const useAddParamsToSearch = (newParams) => {
  const [, setFlightSearchParams] = useFlightSearchParams();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoNewParams = useMemo(() => newParams, [JSON.stringify(newParams)]);
  // react va a memorizar el objeto newParams y cuando cambien va a correr el useEffect

  useEffect(() => {
    setFlightSearchParams((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoNewParams]);
};


/* export const useFavList = (id) => {
  return useFetch(`http://localhost:3001/users/${id}/favoritos`);
}; */