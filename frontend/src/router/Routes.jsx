import { Routes, Route } from "react-router-dom";

// importaciones desde componentes
import FlightSearch from "../components/FlightSearch/FlightSearch";
import { Layout } from "../components/Layout/Layout";
import Home from "../components/Home/Home";
import PasswordRecovery from "../components/PasswordRecovery/PasswordRecovery";

// importaciones desde pages
// import { Layout } from "../pages/Layout";
// import Home from "../pages/Home";
// import PasswordRecovery from "../pages/PasswordRecovery";

function AppRoutes() {
  return (
    <Routes>
      {/* Otras rutas */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/recuperacion" element={<PasswordRecovery />} />
        <Route path="/search" element={<FlightSearch />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
