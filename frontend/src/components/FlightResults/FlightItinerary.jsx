export default function FlightItinerary({ itinerary }) {
  return (
    <div>
      <div className="mb-4 p-4 bg-slate-900 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="font-semibold">{itinerary.departure.airport}</p>
            <p className="text-gray-400">
              Departure: {itinerary.departure.time.date} at{' '}
              {itinerary.departure.time.time}UTC
            </p>
          </div>
          <div className="text-orange-500 text-xl">→</div>
          <div>
            <p className="font-semibold">{itinerary.arrival.airport}</p>
            <p className="text-gray-400">
              Arrival: {itinerary.arrival.time.date} at{' '}
              {itinerary.arrival.time.time}UTC
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
