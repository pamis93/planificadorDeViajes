

function FormSearch({ origin, setOrigin, destination, setDestination, departureDate, setDepartureDate, arrivalDate, setArrivalDate, adults, setAdults, handleSubmit }) {
    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
            <div className="w-1/5">
                <label htmlFor="origin" className="block text-sm font-medium text-gray-700">
                    Origen
                </label>
                <input
                    id="origin"
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="Ciudad de origen"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="w-1/5">
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                    Destino
                </label>
                <input
                    id="destination"
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Ciudad de destino"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="w-1/5">
                <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700">
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
            <div className="w-1/5">
                <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700">
                    Fecha de vuelta
                </label>
                <input
                    id="arrivalDate"
                    type="date"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="w-1/5">
                <label htmlFor="adults" className="block text-sm font-medium text-gray-700">
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
            <button
                type="submit"
                className="w-30 py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
            >
                Buscar vuelos
            </button>
        </form>
    );
}

export default FormSearch;
