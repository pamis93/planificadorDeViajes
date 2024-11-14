import { useCallback, useState } from 'react';
import _debounce from 'lodash/debounce';
import FlightSearchDropdown from './FlightSearchDropdown';
import { useAddParamsToSearch } from '../../hooks/api';
import { useFlightSearchParams } from '../../context/FlightSearchParamsContext';
import { useSearchParams } from 'react-router-dom';

function FlightSearch() {
  const [origin, setOrigin] = useState('');
  const [iataOriginCode, setIataOriginCode] = useState('');
  const [destination, setDestination] = useState('');
  const [iataDestinationCode, setIataDestinationCode] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [adults, setAdults] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const [flightSearchParams] = useFlightSearchParams();

  useAddParamsToSearch({
    departureDate,
    iataOriginCode,
    iataDestinationCode,
    adults,
  });

  const [originResults, setOriginResults] = useState([]);
  const [destinationResults, setDestinationResults] = useState([]);

  const searchCityOrAirport = async (searchTerm, resultSeterFn) => {
    if (searchTerm !== '') {
      try {
        const response = await fetch(
          `http://localhost:3001/city-and-airport-search/${searchTerm}`
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

  const handleButtonClick = async () => {
    setSearchParams(flightSearchParams);
    try {
      const response = await fetch(
        `http://localhost:3001/flight-search/?${{ ...searchParams }}`
      );
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-full h-[500px] z-0">
      <img
        className="w-full h-full object-cover"
        src="../../../public/fondo-header.jfif"
        alt="Fondo"
        style={{ zIndex: -1 }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="z-10 max-w-5xl w-full mx-auto mt-10 px-4 py-8 bg-white rounded-lg shadow-lg">
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
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <FlightSearchDropdown
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
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
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
