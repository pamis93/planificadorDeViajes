import { useCallback, useState } from 'react';
import _debounce from 'lodash/debounce';
import FlightSearchDropdown from './FlightSearchDropdown';
import { useAddParamsToSearch } from '../../hooks/api';
import { useFlightSearchParams } from '../../context/FlightSearchParamsContext';
import areObjValuesTruthy from '../../utils/areObjValuesTruthy';
import { useNavigate } from 'react-router-dom';
// lo de react router DOM
import { useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FlightSearch() {
  // lo del estado de react-router-dom
  const [searchParams, setSearchParams] = useSearchParams();

  const [origin, setOrigin] = useState(searchParams.get('originCode') || '');
  const [iataOriginCode, setIataOriginCode] = useState(
    searchParams.get('originCode') || ''
  );
  const [destination, setDestination] = useState(
    searchParams.get('destinationCode') || ''
  );
  const [iataDestinationCode, setIataDestinationCode] = useState(
    searchParams.get('destinationCode') || ''
  );
  const [departureDate, setDepartureDate] = useState(
    searchParams.get('departureDate') || ''
  );
  const [adults, setAdults] = useState(searchParams.get('adults') || 1);
  const [originResults, setOriginResults] = useState([]);
  const [destinationResults, setDestinationResults] = useState([]);

  const [flightSearchParams] = useFlightSearchParams();

  // no usar el contexto, vamos a pasar las cosas a la url
  useAddParamsToSearch({
    departureDate,
    iataOriginCode,
    iataDestinationCode,
    adults,
  });

  let navigate = useNavigate();

  const searchCityOrAirport = async (searchTerm, resultSeterFn) => {
    if (searchTerm !== '') {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/city-and-airport-search/${searchTerm}`
        );
        const data = await response.json();

        if (data) {
          resultSeterFn(data);
        }
      } catch (error) {
        console.error('Error searching cities and airports:', error);
      }
    }
  };

  const debounceOrigin = useCallback(
    _debounce(
      (searchTerm) => searchCityOrAirport(searchTerm, setOriginResults),
      1000
    ),
    []
  );
  const debounceDestination = useCallback(
    _debounce(
      (searchTerm) => searchCityOrAirport(searchTerm, setDestinationResults),
      1000
    ),
    []
  );

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
    debounceOrigin(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
    debounceDestination(event.target.value);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    if (areObjValuesTruthy(flightSearchParams)) {
      const queryParams = new URLSearchParams({
        originCode: iataOriginCode,
        destinationCode: iataDestinationCode,
        departureDate: departureDate,
        adults: adults,
      });
      console.log('queryparams to string', queryParams);

      setSearchParams(queryParams);
      navigate(`/search/results?${queryParams.toString()}`);
    } else {
      toast.error('Por favor, completa todos los campos obligatorios.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  return (
    <div className="relative w-full h-full bg-[#9AA5BC] ">
      <ToastContainer />
      <img
        className="w-full h-[500px] object-cover mt-20"
        src="/public/fondo-header.jfif"
        alt="Fondo"
        style={{ zIndex: -1 }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className=" max-w-5xl w-full mx-auto mt-10 px-4 py-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Buscar vuelos
          </h2>
          <form className="space-y-6" onSubmit={handleButtonClick}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="origin"
                  className="block text-sm font-medium text-gray-700"
                >
                  Origen
                </label>
                <input
                  id="origin"
                  type="text"
                  value={origin}
                  onChange={handleOriginChange}
                  placeholder="Ciudad de origen"
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                />
                <FlightSearchDropdown
                  className="text-black"
                  seter={setOrigin}
                  results={originResults}
                  isOrigin={true}
                  setIataOriginCode={setIataOriginCode}
                  setIataDestinationCode={setIataDestinationCode}
                />
              </div>
              <div>
                <label
                  htmlFor="destination"
                  className="block text-sm font-medium text-gray-700"
                >
                  Destino
                </label>
                <input
                  id="destination"
                  type="text"
                  value={destination}
                  onChange={handleDestinationChange}
                  placeholder="Ciudad de destino"
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black "
                />
                <FlightSearchDropdown
                  seter={setDestination}
                  results={destinationResults}
                  isOrigin={false}
                  setIataOriginCode={setIataOriginCode}
                  setIataDestinationCode={setIataDestinationCode}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="departureDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de salida
                </label>
                <input
                  id="departureDate"
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                />
              </div>
              <div>
                <label
                  htmlFor="adults"
                  className="block text-sm font-medium text-gray-700"
                >
                  Adultos
                </label>
                <input
                  id="adults"
                  type="number"
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  min="1"
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500  text-black"
                />
              </div>
            </div>
            <button
              onClick={handleButtonClick}
              className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
            >
              Buscar vuelos
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FlightSearch;
