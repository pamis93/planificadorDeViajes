import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx';

import App from './App.jsx';
import './index.css';
import { FlightSearchParamsProvider } from './context/FlightSearchParamsContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <FlightSearchParamsProvider>
          <App />
        </FlightSearchParamsProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
