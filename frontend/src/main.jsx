import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx';
import { FlightSearchParamsProvider } from './context/FlightSearchParamsContext.jsx';

import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
      <UserProvider>
        <FlightSearchParamsProvider>
          <App />
        </FlightSearchParamsProvider>
      </UserProvider>
    </BrowserRouter>

);
