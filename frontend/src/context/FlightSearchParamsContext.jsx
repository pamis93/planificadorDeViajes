import { useContext, useState } from 'react';
import { createContext } from 'react';

export const FlightSearchParamsContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useFlightSearchParams = () =>
  useContext(FlightSearchParamsContext);

export const FlightSearchParamsProvider = ({ children }) => {
  const [flightSearchParams, setFlightSearchParams] = useState({});

  return (
    <FlightSearchParamsContext.Provider
      value={[flightSearchParams, setFlightSearchParams]}
    >
      {children}
    </FlightSearchParamsContext.Provider>
  );
};
