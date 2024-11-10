import { useState } from "react";
import FlightForm from "./FormSearch/FormSearch";

function FlightSearch() {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");
    const [adults, setAdults] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (origin && destination && departureDate) {
            setErrorMessage(""); // Limpiar mensaje de error
            console.log(
                "Buscando vuelos desde:",
                origin,
                "hasta:",
                destination
            );
        } else {
            setErrorMessage(
                "Por favor, completa todos los campos antes de buscar."
            );
        }
    };

    return (
        <>
            <div className="relative w-full h-[500px]">
                <img
                    className="w-full h-full object-cover"
                    src="../../../public/fondo-header.jfif"
                    alt="Fondo"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="z-10 max-w-5xl w-full mx-auto px-4 py-8 bg-white rounded-lg shadow-lg">
                        <FlightForm
                            origin={origin}
                            setOrigin={setOrigin}
                            destination={destination}
                            setDestination={setDestination}
                            departureDate={departureDate}
                            setDepartureDate={setDepartureDate}
                            arrivalDate={arrivalDate}
                            setArrivalDate={setArrivalDate}
                            adults={adults}
                            setAdults={setAdults}
                            handleSubmit={handleSubmit}
                        />
                        {errorMessage && (
                            <p className="text-red-500 text-sm mt-2">
                                {errorMessage}
                            </p>
                        )}
                        <ul className="mt-8">
                            <li className="border-t border-gray-200 pt-6">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Vuelo de {origin} a {destination}
                                </h3>
                                <p className="text-gray-600">
                                    Fecha de salida: {departureDate}
                                </p>
                                <p className="text-gray-600">
                                    Fecha de vuelta: {arrivalDate}
                                </p>
                                <p className="text-gray-600">Precio: €</p>
                                <p className="text-gray-600">Duración: </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FlightSearch;
