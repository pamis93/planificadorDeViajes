import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';
import { useUser } from '../../context/UserContext';

export default function FlightResultModal({ flight, isOpen, closeModal }) {
  const [note, setNote] = useState('');
  const [user] = useUser();

  // console.log(user.token);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSubmitNote = async (event) => {
    event.preventDefault();
    // console.log('nota desde el handlesubmit', note);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/favorite`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${user.token}`,
          },
          body: JSON.stringify({
            origin: `${flight.origin}`,
            destination: `${flight.destination}`,
            departureDate: `${flight.departureDate}`,
            arrivalDate: `${flight.arrivalDate}`,
            aeroline: `${flight.aeroline}`,
            price: `${flight.price}`,
            duration: `${flight.duration}`,
            note: `${note}`,
            userId: `${user.id}`,
          }),
        }
      );
      if (!res.ok) {
        // console.log(res);
        throw new Error('No se pudo guardar en favoritos');
      }
      // poner un tost aqui de que salio bien todo
      toast.success('Vuelo Guardado en Favoritos', {
        position: 'bottom-center',
      });
      setTimeout(() => {
        setNote('');
        closeModal();
      }, 3000);
    } catch (error) {
      console.log('error en el fetch', error);
      toast.error(error.message, {
        position: 'top-right',
      });
      setNote('');
    }
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
        <ToastContainer />
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

            <div className="flex items-center">
              {/* <img 
              src={flight.airline.logo} 
              alt={`${flight.airline.name} logo`} 
              className="h-12 w-12 mr-4"
            /> */}
              <span className="text-gray-300">Aerolínea {flight.aeroline}</span>
            </div>
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
                      Salida: {itinerary.departure.time.date} a las
                      {itinerary.departure.time.time}UTC
                    </p>
                  </div>
                  <div className="text-orange-500 text-xl">→</div>
                  <div>
                    <p className="font-semibold">{itinerary.arrival.airport}</p>
                    <p className="text-gray-400">
                      Llegada: {itinerary.arrival.time.date} a las
                      {itinerary.arrival.time.time}UTC
                    </p>
                  </div>
                  <div className="flex items-center">
                    {/* <img 
              src={flight.airline.logo} 
              alt={`${flight.airline.name} logo`} 
              className="h-12 w-12 mr-4"
            /> */}
                    <span className="text-gray-300">
                      Aerolínea {flight.aeroline}
                    </span>
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
                maxLength={250}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-400 text-sm">
                  {note.length}/250 caracteres
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
