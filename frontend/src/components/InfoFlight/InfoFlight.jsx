import { useState } from "react";
import useFetchFlights from "./hooks/useFetchFlights";


function InfoFlight() {
    const { flights, loading, error } = useFetchFlights(); 
    const [selectedFlight, setSelectedFlight] = useState(null);

    // Llamada cuando un vuelo es seleccionado
    const handleFlightClick = (flightId) => {
        const flight = flights.find((f) => f.id === flightId);
        setSelectedFlight(flight);
    };

    // Renderizado condicional
    if (loading) {
        return <p>Cargando vuelos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Vuelos Disponibles</h2>
            <ul>
                {flights.map((flight) => (
                    <li
                        key={flight.id}
                        onClick={() => handleFlightClick(flight.id)}
                    >
                        {flight.origen} - {flight.destino} | {flight.precio} €
                    </li>
                ))}
            </ul>

            {/* Mostrar detalles del vuelo seleccionado */}
            {selectedFlight && (
                <div>
                    <h3>Detalles del vuelo</h3>
                    <p>
                        <strong>Origen:</strong> {selectedFlight.origin}
                    </p>
                    <p>
                        <strong>Destino:</strong> {selectedFlight.destination}
                    </p>
                    <p>
                        <strong>Precio:</strong> {selectedFlight.price} €
                    </p>
                    <p>
                        <strong>Fecha de salida:</strong>{" "}
                        {selectedFlight.fecha_salida}
                    </p>
                    <p>
                        <strong>Duración:</strong> {selectedFlight.duration}
                    </p>
                    
                </div>
            )}
        </div>
    );
}

export default InfoFlight;
