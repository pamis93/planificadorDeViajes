import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// componentes propios
import FlightResultsFilter from './FlightResultsFilter';
import FlightResultCard from './FlightResultCard';
import Pagination from './Pagination';
// import { useSearchParams } from 'react-router-dom';
// import { useFlightSearchParams } from '../../context/FlightSearchParamsContext';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function FlightResults() {
  // estos son los estados para manejar las urls
  const [searchParams] = useSearchParams();
  // el contexto con el objeto con los parámetros de búsqueda
  const [flights, setFlights] = useState({ resume: [], processed: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [flightsPerPage] = useState(3);

  // para la pagination scrolee al top cuando se cambia la pagina
  const scrollTargetRef = useRef(null);

  // const currentQuery = searchParams.get('departureDate');
  // console.log('esta es la current query', currentQuery);

  // usar esto para ??
  // console.log(Object.fromEntries(searchParams));

  useEffect(() => {
    callTheApi();
    setCurrentPage(1);
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
      // Mostrar error como un toast
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastFlights = currentPage * flightsPerPage;
  const indexOfFirstFlights = indexOfLastFlights - flightsPerPage;
  const currentFlights = flights?.processed.slice(
    indexOfFirstFlights,
    indexOfLastFlights
  );
  console.log(currentFlights);

  if (loading) {
    return (
      <div className="flex justify-center h-screen ">
        <div className="relative mt-60 w-[300px] sm:w-[600px] h-24 shadow-md rounded-md">
          <div className="absolute top-0 left-0 w-full h-full">
            <div
              className="animate-fly absolute top-2/3 left-0 w-10 h-10 bg-no-repeat bg-contain"
              style={{ backgroundImage: 'url("/plane-icon.png")' }}
            ></div>
          </div>
          <div className="flex items-center justify-center sm:text-3xl font-bold bg-gray-100 rounded-md w-full h-full">
            <h1 className="text-black">Buscando tu proxima aventura...</h1>
          </div>
        </div>
      </div>
    );

    // <div className="text-center p-8">Cargando resultados...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center h-screen ">
        <div className="mt-60 flex items-center justify-center sm:text-3xl font-bold bg-slate-100 w-[300px] sm:w-[600px] h-24 shadow-md rounded-md">
          <h1 className="text-white">Ha ocurrido un error - {error}</h1>
        </div>
      </div>
    );

    // <div className="text-center p-8 text-red-600">Error: {error}</div>;
  }

  // if (currentFlights.length === 0) {
  //   return (
  //     <div className="flex justify-center h-screen ">
  //       <div className="mt-60 flex items-center justify-center sm:text-3xl font-bold bg-slate-100 w-[300px] sm:w-[600px] h-24 shadow-md rounded-md">
  //         <h1 className="text-white">No hay vuelos para la búsqueda actual</h1>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div
      ref={scrollTargetRef}
      className="w-full min-h-screen flex flex-col mt-20"
    >
      <ToastContainer />
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

      <div className="flex flex-col w-full mt-3">
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-1/4 p-4 order-0 md:order-1">
            <FlightResultsFilter priceRange={flights.priceRange} />
          </div>

          {/* cuidado con esto solo le estoy pasando el objeto resume voy a tener que cambiarlo tanto aqui como en la card si quiero usar en la card la información completa tomar decision sobre esto pronto */}
          <div className="w-full md:w-3/4 space-y-4 order-1 md:order-0 overflow-y-auto">
            {/* {currentFlights.map((flight) => {
              return <FlightResultCard key={flight.id} flight={flight} />;
            })} */}
            {currentFlights.length != 0 ? (
              currentFlights.map((flight) => {
                return <FlightResultCard key={flight.id} flight={flight} />;
              })
            ) : (
              <div className="flex justify-center h-screen ">
                <div className="mt-60 flex items-center justify-center sm:text-3xl font-bold bg-slate-900 w-[300px] sm:w-[600px] h-24 shadow-md rounded-md">
                  <h1 className="text-white">
                    No hay vuelos para la búsqueda actual
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className=" flex justify-center mt-4">
          <Pagination
            length={flights.processed.length}
            flightsPerPage={flightsPerPage}
            handlePagination={setCurrentPage}
            currentPage={currentPage}
            scrollTargetRef={scrollTargetRef}
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
