export default function FlightSearchDropdown({ results }) {
  return (
    <div>
      <div className="results">
        {results.map((res) => (
          <div style={{ color: 'black' }} key={res.iataCode}>
            {res.detailedName}
          </div>
        ))}
      </div>
    </div>
  );
}
