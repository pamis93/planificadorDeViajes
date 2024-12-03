import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function FlightResultsFilter({ priceRange }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [nonStop, setNonStop] = useState(
    searchParams.get('nonStop') === 'true' ? true : false
  );
  const [adults, setAdults] = useState(searchParams.get('adults') || 1);
  const [children, setChildren] = useState(searchParams.get('children') || 0);
  const [infants, setInfants] = useState(searchParams.get('children') || 0);
  const [travelClass, setTravelClass] = useState(
    searchParams.get('travelClass') || 'ECONOMY'
  );
  const [currencyCode, setCurrencyCode] = useState(
    searchParams.get('currencyCode') || 'EUR'
  );
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || 100);
  const [departureDate, setDepartureDate] = useState(
    searchParams.get('departureDate') || ''
  );
  // const [returnDate, setReturnDate] = useState(
  //   searchParams.get('returnDate') || ''
  // );

  const handleSubmit = (event) => {
    event.preventDefault();

    const originCode = searchParams.get('originCode');
    const destinationCode = searchParams.get('destinationCode');
    const dateOfDeparture = searchParams.get('departureDate');
    const adults = searchParams.get('adults');

    const queryParams = new URLSearchParams({
      originCode: originCode,
      destinationCode: destinationCode,
      departureDate: dateOfDeparture,
      adults: adults,
      nonStop: nonStop,
      children: children,
      infants: infants,
      travelClass: travelClass,
      currencyCode: currencyCode,
      maxPrice: maxPrice,
      // returnDate: returnDate,
    });

    setSearchParams(queryParams);
    console.log({
      nonStop,
      children,
      infants,
      travelClass,
      currencyCode,
      maxPrice,
      // returnDate,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mt-4">
          <div>
            <label className="text-white dark:text-gray-200" htmlFor="stops">
              Tipo de vuelo
            </label>
            <div className="flex items-center mt-2 space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="stops"
                  value={true}
                  checked={nonStop === true}
                  onChange={() => setNonStop(true)}
                  className="text-orange-500 focus:ring-blue-400"
                />
                <span className="ml-2 text-white dark:text-gray-300">
                  Directo
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="stops"
                  value={false}
                  checked={nonStop === false}
                  onChange={() => setNonStop(false)}
                  className="text-orange-500 focus:ring-blue-400"
                />
                <span className="ml-2 text-white dark:text-gray-300">
                  Con escalas
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="text-white dark:text-gray-200" htmlFor="adults">
              Adultos
            </label>
            <input
              id="adults"
              type="number"
              min="1"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-white dark:text-gray-200" htmlFor="children">
              Niños (Children)
            </label>
            <input
              id="children"
              type="number"
              min="0"
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="text-white dark:text-gray-200" htmlFor="infants">
              Bebés (Infants)
            </label>
            <input
              id="infants"
              type="number"
              min="0"
              value={infants}
              onChange={(e) => setInfants(Number(e.target.value))}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label
              className="text-white dark:text-gray-200"
              htmlFor="travelClass"
            >
              Clase de vuelo
            </label>
            <select
              id="travelClass"
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            >
              <option value="ECONOMY">Economy</option>
              <option value="PREMIUM_ECONOMY">Premium Economy</option>
              <option value="BUSINESS">Business</option>
              <option value="FIRST">First</option>
            </select>
          </div>

          <div>
            <label
              className="text-white dark:text-gray-200"
              htmlFor="currencyCode"
            >
              Moneda
            </label>
            <select
              id="currencyCode"
              value={currencyCode}
              onChange={(e) => setCurrencyCode(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>

          <div>
            <label className="text-white dark:text-gray-200" htmlFor="maxPrice">
              Rango de Precio por pasajero
            </label>
            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-300 dark:text-gray-400">
                {parseInt(priceRange.minPrice).toFixed(0)} {priceRange.currency}
              </span>
              <span className="text-white">
                {maxPrice} {priceRange.currency}
              </span>
              <span className="text-gray-300 dark:text-gray-400">
                {parseInt(priceRange.maxPrice).toFixed(0)} {priceRange.currency}
              </span>
            </div>
            <input
              id="maxPrice"
              type="range"
              min={parseInt(priceRange.minPrice).toFixed(0)}
              max={parseInt(priceRange.maxPrice).toFixed(0)}
              step="1"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value).toFixed(0))}
              className="block w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label
              className="text-white dark:text-gray-200"
              htmlFor="departureDate"
            >
              Fecha de Salida
            </label>
            <input
              id="departureDate"
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          {/* <div>
            <label
              className="text-white dark:text-gray-200"
              htmlFor="returnDate"
            >
              Fecha de regreso
            </label>
            <input
              id="returnDate"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div> */}
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-[rgb(31,196,255)] hover:text-black focus:outline-none focus:bg-gray-600"
          >
            Aplicar Filtros
          </button>
        </div>
      </form>
    </>
  );
}

// http://localhost:5173/search/results?originCode=MAD&destinationCode=BCN&departureDate=2024-11-27&adults=1
