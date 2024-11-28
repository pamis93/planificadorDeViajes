export default function FlightResultCard({ flight }) {
  return (
    <div className="p-4 bg-slate-800 text-white">
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
              {/* <div>{flight.duration}</div> */}
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
    </div>
  );
}
