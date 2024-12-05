import { useTranslation } from 'react-i18next';
export default function FlightItinerary({ itinerary }) {
  const { t } = useTranslation();
  return (
    <div>
      <div className="mb-4 p-4 bg-slate-900 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="font-semibold">{itinerary.departure.airport}</p>
            <p className="text-gray-400">
              {t('itinerary.departure')}: {itinerary.departure.time.date}&#32;
              {t('itinerary.at')}&#32;
              {itinerary.departure.time.time}UTC
            </p>
          </div>
          <div className="text-orange-500 text-xl">→</div>
          <div>
            <p className="font-semibold">{itinerary.arrival.airport}</p>
            <p className="text-gray-400">
              {t('itinerary.arrival')}: {itinerary.arrival.time.date}&#32;
              {t('itinerary.at')}&#32;
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
              {t('itinerary.airline')} {itinerary.carrier.code}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
