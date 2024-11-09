import { useState } from "react";
import { useFlightSearch } from "../../hooks/api";

function FlightSearch() {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [adults, setAdults] = useState(1);

    const [searchParams, setSearchParams] = useState({
        origin: "",
        destination: "",
        departureDate: "",
        adults: 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (origin && destination && departureDate) {
            setSearchParams({ origin, destination, departureDate, adults });
        } else {
            alert("Por favor, completa todos los campos antes de buscar.");
        }
    };

    return (
        <div>
            <h2>Buscar vuelos</h2>
            <form onSubmit={handleSubmit}>
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

            <ul>
                <li>
                    <h3>
                        Vuelo de {origin} a {destination}
                    </h3>
                    <p>Fecha de salida:{departureDate} </p>
                    <p>Precio: €</p>
                    <p>Duración: </p>
                </li>
            </ul>
        </div>
    );
}

export default FlightSearch;
