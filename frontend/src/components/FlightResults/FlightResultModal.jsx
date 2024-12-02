import { useState } from 'react';
export default function FlightResultModal({ flight, isOpen, closeModal }) {
  const [note, setNote] = useState('');

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmitNote = (e) => {
    e.preventDefault();

    console.log('Submitted Note:', note);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-slate-900 rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-white hover:text-orange-500 transition-colors"
        >
          X
        </button>

        <div className="bg-slate-800 p-6 rounded-t-lg">
          <h2 className="text-3xl font-bold text-orange-500 text-center">
            {flight.price} {flight.details.price.currency}
          </h2>
        </div>

        <div className="p-6 text-white">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4">Ruta</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xl font-semibold">{flight.origin}</p>
                <p className="text-gray-400">Aeropuerto de Salida</p>
              </div>
              <div className="text-orange-500 text-2xl">→</div>
              <div>
                <p className="text-xl font-semibold">{flight.destination}</p>
                <p className="text-gray-400">Aeropuerto de Llegada</p>
              </div>
            </div>
            <p className="mt-2 text-gray-300">
              Duración Total: {flight.duration}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Itinerario Detallado</h3>
            {flight.details.itinerary.map((itinerary, index) => (
              <div key={index} className="mb-4 p-4 bg-slate-800 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold">
                      {itinerary.departure.airport}
                    </p>
                    <p className="text-gray-400">
                      Salida: {itinerary.departure.time.date} a las{' '}
                      {itinerary.departure.time.time}UTC
                    </p>
                  </div>
                  <div className="text-orange-500 text-xl">→</div>
                  <div>
                    <p className="font-semibold">{itinerary.arrival.airport}</p>
                    <p className="text-gray-400">
                      Llegada: {itinerary.arrival.time.date} a las{' '}
                      {itinerary.arrival.time.time}UTC
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4">Añadir Nota</h3>
            <form onSubmit={handleSubmitNote}>
              <textarea
                value={note}
                onChange={handleNoteChange}
                placeholder="Escribe una nota sobre este vuelo..."
                className="w-full p-4 bg-slate-800 text-white rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows="4"
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-400 text-sm">
                  {note.length}/500 caracteres
                </p>
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Guardar en Favoritos
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
