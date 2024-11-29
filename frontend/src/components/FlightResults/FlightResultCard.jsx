import FlightItinerary from './FlightItinerary';

export default function FlightResultCard({ flight }) {
  return (
    <>
      {/* <div className="p-4 bg-slate-800 text-white">
        <div className="flex justify-between items-center">
          <div className="flex-1 ">
            <div className="flex justify-around gap-4">
              <div>
                <p className="font-bold">
                  {flight.departureDate} - {flight.departureDate}
                </p>
                <p className="text-sm text-gray-400">{flight.origin}</p>
                <p className="text-sm text-gray-400">
                  {flight.origin} - {flight.destination}
                </p>
                <p className="text-sm text-gray-400">
                  {flight.origin} - {flight.destination}
                </p>
              </div>
              <div className="flex-col place-content-center gap-2">
                <span>{flight.duration}</span>
                
                <div>
                  <p>Aerolínea {flight.aeroline}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{flight.price}</p>
            <button className="bg-orange-500 text-white px-4 py-2 rounded mt-2">
              Seleccionar
            </button>
          </div>
        </div>
      </div> */}

      {/* !!!!!! */}
      {/* <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="text-center text-3xl font-bold text-red-700 py-4">
          {flight.price} {flight.details.price.currency}
        </div>
        <div className="p-6">
          <div className="text-center">
            <h4 className="text-lg font-light text-info pb-3">
              Departure{' '}
              <span className="text-sm text-gray-500">
                Total duration 1H25M
              </span>
            </h4>
            <h4 className="flex items-center justify-center space-x-2">
              <img
                src="/api/placeholder/40/40"
                alt="Airline"
                className="w-10 h-10"
              />
              <span>07:30 MAD</span>
              <span className="text-info mx-2">→</span>
              <span>BCN 08:55</span>
            </h4>

            <hr className="my-4 border-gray-300" />

            <h4 className="text-lg font-light text-info pb-3">
              Return{' '}
              <span className="text-sm text-black">Total duration 1H30M</span>
            </h4>
            <h4 className="flex items-center justify-center space-x-2">
              <img
                src="/api/placeholder/40/40"
                alt="Airline"
                className="w-10 h-10"
              />
              <span>11:50 BCN</span>
              <span className="text-info mx-2">→</span>
              <span>MAD 13:20</span>
            </h4>
          </div>
        </div>
      </div> */}

      {/* !!!!!!!!!! */}

      <div className="max-w-xl mx-auto bg-slate-800 rounded-lg shadow-md overflow-hidden">
        <div className="text-center text-3xl font-bold text-orange-500 py-4">
          {flight.price} {flight.details.price.currency}
        </div>
        <div className="p-3">
          <div className="text-center">
            <h4 className="text-lg font-bold text-white pb-3">
              {flight.origin}
              <span className="text-info text-orange-500 mx-2">→</span>
              {flight.destination}
              <span className="m-3 text-sm text-white">
                Total duration {flight.duration}
              </span>
            </h4>
          </div>
          <div className="text-left">
            <h5 className="text-lg font-light text-white text-info pb-1">
              Itinerario
            </h5>
          </div>
        </div>
        {flight.details.itinerary.map((itinerary, index) => {
          return <FlightItinerary key={index} itinerary={itinerary} />;
        })}
        {/* <div className="p-6">
          <div className="text-center">
            <h4 className="text-lg font-light text-info pb-3">
              Departure{' '}
              <span className="text-sm text-gray-500">Total duration 4H5M</span>
            </h4>
            <h4 className="flex items-center justify-center space-x-2">
              <img
                src="/api/placeholder/40/40"
                alt="Airline"
                className="w-10 h-10"
              />
              <span>17:05 MAD</span>
              <span className="text-info mx-2">→</span>
              <span>PMI 18:25</span>
            </h4>

            <p className="text-sm italic text-gray-600 my-2">
              Connection duration is 2:45
            </p>

            <h4 className="flex items-center justify-center space-x-2">
              <img
                src="/api/placeholder/40/40"
                alt="Airline"
                className="w-10 h-10"
              />
              <span>20:20 PMI</span>
              <span className="text-info mx-2">→</span>
              <span>BCN 21:10</span>
            </h4>

            <hr className="my-4 border-gray-300" />

            <h4 className="text-lg font-light text-info pb-3">
              Return{' '}
              <span className="text-sm text-black">Total duration 1H30M</span>
            </h4>
            <h4 className="flex items-center justify-center space-x-2">
              <img
                src="/api/placeholder/40/40"
                alt="Airline"
                className="w-10 h-10"
              />
              <span>11:50 BCN</span>
              <span className="text-info mx-2">→</span>
              <span>MAD 13:20</span>
            </h4>
          </div>
        </div> */}
      </div>
    </>
  );
}
