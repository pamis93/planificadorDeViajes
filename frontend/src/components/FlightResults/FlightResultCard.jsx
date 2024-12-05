import { useState } from 'react';
import FlightItinerary from './FlightItinerary';
import FlightResultModal from './FlightResultModal';
import { useUser } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';

export default function FlightResultCard({ flight }) {
  const [user] = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setIsModalOpen(false);
  };

  const { t } = useTranslation(); // Usamos el hook useTranslation

  return (
    <>
      <div className="max-w-full mx-auto bg-slate-800 rounded-lg shadow-md overflow-hidden ">
        <div className="p-6 text-white">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between text-center py-4 space-y-2 sm:space-y-0 ">
              <div className="w-full sm:w-auto text-center">
                <span className="text-3xl font-bold text-orange-500">
                  {flight.price} {flight.details.price.currency}
                </span>
              </div>
              <div className="w-full sm:w-auto flex justify-center">
                {/* aquí la lógica para que el botón se muestre solo si esta logeado */}

                {user?.id ? (
                  <button
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    onClick={openModal}
                  >
                    {t('resultCard.saveToFavorites')}
                  </button>
                ) : (
                  <span>{t('resultCard.registerToSave')}</span>
                )}
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4">{t('resultCard.route')}</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xl font-semibold">{flight.origin}</p>
                <p className="text-gray-400">
                  {t('resultCard.departureAirport')}
                </p>
              </div>
              <div className="text-orange-500 text-2xl">→</div>
              <div>
                <p className="text-xl font-semibold">{flight.destination}</p>
                <p className="text-gray-400">
                  {t('resultCard.arrivalAirport')}
                </p>
              </div>
            </div>
            <p className="mt-2 text-gray-300">
              {t('resultCard.totalDuration')}: {flight.duration}
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">
              {t('resultCard.itineraryDetails')}
            </h3>
            {flight.details.itinerary.map((itinerary, index) => {
              return <FlightItinerary key={index} itinerary={itinerary} />;
            })}
          </div>
        </div>

        <FlightResultModal
          flight={flight}
          isOpen={isModalOpen}
          closeModal={closeModal}
        />
      </div>
    </>
  );
}
