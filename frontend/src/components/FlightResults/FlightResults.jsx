import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Componentes propios
import FlightResultsFilter from './FlightResultsFilter';
import FlightResultCard from './FlightResultCard';
import Pagination from './Pagination';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Importa useTranslation

export default function FlightResults() {
  const { t } = useTranslation(); // Usa useTranslation para obtener las traducciones
  const [searchParams] = useSearchParams();
  const [flights, setFlights] = useState({ resume: [], processed: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [flightsPerPage] = useState(3);
  const scrollTargetRef = useRef(null);

  useEffect(() => {
    callTheApi();
    setCurrentPage(1);
  }, [searchParams]);

  const callTheApi = async () => {
    try {
      setLoading(true);
      setError(null);
      const originCode = searchParams.get('originCode');
      const destinationCode = searchParams.get('destinationCode');
      const dateOfDeparture = searchParams.get('departureDate');
      const adults = searchParams.get('adults');

      if (!originCode || !destinationCode || !dateOfDeparture || !adults) {
        throw new Error('Missing required search parameters');
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/flight-search?${searchParams.toString()}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch flight results');
      }

      const data = await response.json();
      setFlights(data);
    } catch (error) {
      setError(error.message);
      toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastFlights = currentPage * flightsPerPage;
  const indexOfFirstFlights = indexOfLastFlights - flightsPerPage;
  const currentFlights = flights?.processed.slice(indexOfFirstFlights, indexOfLastFlights);

  if (loading) {
    return (
      <div className="flex justify-center h-screen ">
        <div className="relative mt-60 w-[300px] sm:w-[600px] h-24 shadow-md rounded-md">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="animate-fly absolute top-2/3 left-0 w-10 h-10 bg-no-repeat bg-contain"
              style={{ backgroundImage: 'url("/plane-icon.png")' }}></div>
          </div>
          <div className="flex items-center justify-center sm:text-3xl font-bold bg-gray-100 rounded-md w-full h-full">
            <h1 className="text-black">{t('result.searchingFlight')}</h1> {/* Modificado */}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center h-screen ">
        <div className="mt-60 flex items-center justify-center sm:text-3xl font-bold bg-slate-100 w-[300px] sm:w-[600px] h-24 shadow-md rounded-md">
          <h1 className="text-white">{t('result.noFlightsFound')} - {error}</h1> {/* Modificado */}
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollTargetRef} className="w-full min-h-screen flex flex-col mt-20">
      <ToastContainer />
      <div className=" w-full relative">
        <img className="w-full h-[200px] object-cover" src="/ventanilla.jfif" alt="Fondo" />
        <div className="bg-slate-400 bg-opacity-30 text-white z-10 px-4 py-2 absolute top-0 rounded-lg">
          <h1 className="text-3xl font-bold text-center text-white dark:text-white z-10 px-4 py-2 rounded-lg">
            {t('result.findFlight')} 
          </h1>
          <h2 className="text-xl">{t('result.toYourTravelPlans')}</h2> 
          <p className="text-sm mt-4">{t('result.selectFlight')}</p> 
        </div>
      </div>

      <div className="flex flex-col w-full mt-3">
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-1/4 p-4 order-0 md:order-1">
            <FlightResultsFilter priceRange={flights.priceRange} />
          </div>
          <div className="w-full md:w-3/4 space-y-4 order-1 md:order-0 overflow-y-auto">
            {currentFlights.length !== 0 ? (
              currentFlights.map((flight) => <FlightResultCard key={flight.id} flight={flight} />)
            ) : (
              <div className="flex justify-center h-screen ">
                <div className="mt-60 flex items-center justify-center sm:text-3xl font-bold bg-slate-900 w-[300px] sm:w-[600px] h-24 shadow-md rounded-md">
                  <h1 className="text-white">{t('result.noFlightsFound')}</h1> 
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
