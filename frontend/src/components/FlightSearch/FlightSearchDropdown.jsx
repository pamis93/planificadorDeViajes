export default function FlightSearchDropdown({
  results,
  seter,
  isOrigin,
  setIataOriginCode,
  setIataDestinationCode,
}) {
  // const [iataOriginCode, setIataOriginCode] = useState('');
  // const [iataDestinationCode, setIataDestinationcode] = useState('');
  // const [iataCode, setIataCode] = useState('');

  const handleItemClick = (res) => {
    seter(`${res.city} - ${res.name}`);
    if (isOrigin) {
      setIataOriginCode(res.iataCode);
    } else {
      setIataDestinationCode(res.iataCode);
    }
  };

  return (
    <div>
      <div className="results">
        {results.map((res) => (
          <div
            onClick={() => handleItemClick(res)}
            style={{ color: 'black' }}
            key={res.iataCode}
          >
            {res.city} - {res.name}
          </div>
        ))}
      </div>
    </div>
  );
}
