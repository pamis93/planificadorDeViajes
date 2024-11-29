export default function FlightItinerary({ itinerary }) {
  return (
    <div className="p-3">
      <div className="text-center">
        <hr className="my-4 border-gray-300" />
        <h4 className="text-lg text-white font-light text-info pb-3">
          {itinerary.departure.airport}
          <span className="text-info text-orange-500 mx-2">→</span>
          {itinerary.arrival.airport}
          {/* <span className="m-3 text-sm text-gray-500">
                Total duration {flight.duration}
              </span> */}
        </h4>
        <h4 className="flex items-center justify-center space-x-2">
          {/* esto es para poner la imagen de la aerolinea si la encuentro */}
          {/* <img
            src="/api/placeholder/40/40"
            alt="Airline"
            className="w-10 h-10"
          /> */}

          <span className="text-white">
            Salida a las {itinerary.departure.time.time}UTC del{' '}
            {itinerary.departure.time.date}
          </span>
          <span className="text-info text-orange-500 mx-2">→</span>
          <span className="text-white">
            Llegada a las {itinerary.arrival.time.time}UTC del{' '}
            {itinerary.arrival.time.date}
          </span>
        </h4>
        {/* <hr className="my-4 border-gray-300" /> */}
      </div>
    </div>
  );
}
