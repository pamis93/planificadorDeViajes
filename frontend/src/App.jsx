
import { Route, Routes } from "react-router-dom";
import FlightSearch from "./components/FlightSearch/FlightSearch";
import "./App.css";

// import AppRouter from './router/Routes';

function App() {
  return (
    <>
      <Routes>
        <Route path="/search" element={<FlightSearch />} />
      </Routes>
    </>

  );
}

export default App;
