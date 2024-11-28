// componentes propios
import FlightResultsFilter from './FlightResultsFilter';
import FlightResultCard from './FlightResultCard';
import Pagination from './Pagination';
// import { useSearchParams } from 'react-router-dom';
// import { useFlightSearchParams } from '../../context/FlightSearchParamsContext';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function FlightResults() {
  // estos son los estados para manejar las urls
  const [searchParams] = useSearchParams();
  // el contexto con el objeto con los parámetros de búsqueda
  const [flights, setFlights] = useState({ resume: [], processed: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [flightsPerPage] = useState(7);

  // const currentQuery = searchParams.get('departureDate');
  // console.log('esta es la current query', currentQuery);

  // usar esto para ??
  // console.log(Object.fromEntries(searchParams));

  useEffect(() => {
    callTheApi();
  }, [searchParams]);

  const callTheApi = async () => {
    try {
      setLoading(true);
      setError(null);
      // searchParams es solo como de lectura tengo que traerme los parámetros de la url de forma manual con el get
      const originCode = searchParams.get('originCode');
      const destinationCode = searchParams.get('destinationCode');
      const dateOfDeparture = searchParams.get('departureDate');
      const adults = searchParams.get('adults');

      if (!originCode || !destinationCode || !dateOfDeparture || !adults) {
        throw new Error('Faltan parámetros obligatorios en la búsqueda');
      }
      console.log('queryparams to string', searchParams.toString());
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/flight-search?${searchParams.toString()}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch flight results');
      }

      const data = await response.json();
      console.log(data);
      setFlights(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastFlights = currentPage * flightsPerPage;
  const indexOfFirstFlights = indexOfLastFlights - flightsPerPage;
  const currentFlights = flights?.resume.slice(
    indexOfFirstFlights,
    indexOfLastFlights
  );
  console.log(currentFlights);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="flex justify-center h-screen ">
        <div className="mt-60 flex items-center justify-center sm:text-3xl font-bold bg-white w-[300px] sm:w-[600px] h-24 shadow-md rounded-md">
          <h1 className="text-black">
            No te vayas estamos buscando tus vuelos
          </h1>
        </div>
      </div>
    );

    // <div className="text-center p-8">Cargando resultados...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center h-screen ">
        <div className="mt-60 flex items-center justify-center sm:text-3xl font-bold bg-white w-[300px] sm:w-[600px] h-24 shadow-md rounded-md">
          <h1 className="text-black">Ha ocurrido un error - {error}</h1>
        </div>
      </div>
    );

    // <div className="text-center p-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="w-full h-screen flex flex-col mt-20">
      <div className=" w-full relative">
        <img
          className="w-full h-[200px] object-cover"
          src="/ventanilla.jfif"
          alt="Fondo"
        />
        <div className="bg-slate-400 bg-opacity-30 text-white z-10 px-4 py-2 absolute top-0 rounded-lg">
          <h1 className="text-3xl font-bold text-center text-white dark:text-white z-10 px-4 py-2 rounded-lg">
            ENCUENTRA EL VUELO QUE SE AJUSTE
          </h1>
          <h2 className="text-xl">A TUS PLANES DE VIAJE</h2>
          <p className="text-sm mt-4">
            Selecciona Tu Vuelo Y Prepárate Para Despegar
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="flex w-full">
          <div className="w-1/4 p-4">
            <FlightResultsFilter priceRange={flights.priceRange} />
          </div>

          {/* cuidado con esto solo le estoy pasando el objeto resume voy a tener que cambiarlo tanto aqui como en la card si quiero usar en la card la información completa tomar decision sobre esto pronto */}
          <div className="w-3/4 space-y-4">
            {currentFlights.map((flight) => {
              return <FlightResultCard key={flight.id} flight={flight} />;
            })}
          </div>
        </div>
        <div className=" flex justify-center mt-4">
          <Pagination
            length={flights.resume.length}
            flightsPerPage={flightsPerPage}
            handlePagination={handlePagination}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

// localhost:3001/flight-search?originCode=MAD&destinationCode=BCN&dateOfDeparture=2024-11-20&adults=1&totalResults=3
// localhost:3001/flight-search/?departureDate=2024-11-20&iataOriginCode=MAD&iataDestinationCode=BCN&adults=1
// http://localhost:3001/flight-search?departureDate=2024-11-26&iataOriginCode=MAD&iataDestinationCode=BCN&adults=1
// http://localhost:3001/flight-search?departureDate=2024-11-25&originCode=MAD&destinationCode=BCN&adults=1
