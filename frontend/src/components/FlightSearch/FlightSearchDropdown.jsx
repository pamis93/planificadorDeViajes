export default function FlightSearchDropdown({
  results,
  seter,
  isOrigin,
  setIataOriginCode,
  setIataDestinationCode,
  setShow,
}) {
  // const [iataOriginCode, setIataOriginCode] = useState('');
  // const [iataDestinationCode, setIataDestinationcode] = useState('');
  // const [iataCode, setIataCode] = useState('');

  const handleItemClick = (res) => {
    seter(`${res.city} - ${res.name}`);
    if (isOrigin) {
      setIataOriginCode(res.iataCode);
      setShow(false);
    } else {
      setIataDestinationCode(res.iataCode);
      setShow(false);
    }
  };

  // TODO considerar un tamaño fijo con un scroll para que no empuje el contenido para abajo
  return (
    <div>
      <div className="absolute bg-white border border-gray-300 mt-2 w-full rounded-lg shadow-lg text-black z-10">
        {results.map((res) => (
          <div
            onClick={() => handleItemClick(res)}
            // style={{ color: 'black' }}
            className="p-2 cursor-pointer hover:bg-gray-100"
            key={res.iataCode}
          >
            {res.city} - {res.name}
          </div>
        ))}
      </div>
    </div>
  );
}
