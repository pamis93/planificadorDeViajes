import { useCallback, useState } from 'react';
import _debounce from 'lodash/debounce';
import FlightSearchDropdown from './FlightSearchDropdown';
// import { useFlightSearch } from "../../hooks/api";
// import { useCityAndAirportSearch } from '../../hooks/api';
function FlightSearch() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [adults, setAdults] = useState(1);

  // estado para guardar lo que retorna la api
  const [originResults, setOriginResults] = useState([]);
  const [destinationResults, setDestinationResults] = useState([]);

  const searchCityOrAirport = async (searchTerm, resultSeterFn) => {
    if (searchTerm !== '') {
      try {
        const response = await fetch(
          `http://localhost:3001/city-and-airport-search/${searchTerm}`
        );
        const data = await response.json();
        console.log(data);

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

  return (
    <div>
      <h2>Buscar vuelos</h2>
      <form>
        <label>
          Origen:
          <input
            type="text"
            value={origin}
            onChange={handleOriginChange}
            placeholder="Ciudad de origen"
          />
          <FlightSearchDropdown results={originResults} />
        </label>
        <label>
          Destino:
          <input
            type="text"
            value={destination}
            onChange={handleDestinationChange}
            placeholder="Ciudad de destino"
          />
          <FlightSearchDropdown results={destinationResults} />
        </label>
        <label>
          Fecha de salida:
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </label>
        <label>
          Adultos:
          <input
            type="number"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            min="1"
          />
        </label>
        <button type="submit">Buscar vuelos</button>
      </form>

      {/* {loading && <p>Cargando vuelos...</p>}
      {error && <p>Error: {error}</p>} */}

      {/* <ul>
        {flights?.data?.map((flight) => (
          <li key={flight.id}>
            <h3>
              Vuelo de {flight.itineraries[0].segments[0].departure.iataCode} a{" "}
              {flight.itineraries[0].segments[0].arrival.iataCode}
            </h3>
            <p>
              Fecha de salida: {flight.itineraries[0].segments[0].departure.at}
            </p>
            <p>Precio: {flight.price.grandTotal} €</p>
            <p>
              Duración:{" "}
              {flight.itineraries[0].duration.replace("PT", "").toLowerCase()}
            </p>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default FlightSearch;
