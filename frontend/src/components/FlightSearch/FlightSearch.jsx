import { useState } from "react";
// import { useFlightSearch } from "../../hooks/api";

function FlightSearch() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [adults, setAdults] = useState(1);

  // const [searchParams, setSearchParams] = useState({
  //     origin: "",
  //     destination: "",
  //     departureDate: "",
  //     adults: 1
  // });

  // const {
  //     content: flights,
  //     loading,
  //     error,
  // } = useFlightSearch(searchParams);

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (origin && destination && departureDate) {
  //         setSearchParams({ origin, destination, departureDate, adults });
  //     } else {
  //         alert("Por favor, completa todos los campos antes de buscar.");
  //     }
  // };

  return (
    <div>
      <h2>Buscar vuelos</h2>
      <form>
        <label>
          Origen:
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Ciudad de origen"
          />
        </label>
        <label>
          Destino:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Ciudad de destino"
          />
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
