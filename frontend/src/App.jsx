// ! importacion para el router de emmanuel en espera de como se va a a trabajar
// import Routes from './router/Routes';
// ! si se usa esta hay que sacar Routes de la importación de abajo
// import { Route, Routes } from "react-router-dom";

import { Route, Routes } from "react-router-dom";

// importaciones desde componentes
import FlightSearch from "./components/FlightSearch/FlightSearch";
import { Layout } from "./components/Layout/Layout";
import PasswordRecovery from "./components/PasswordRecovery/PasswordRecovery";
import Home from "./components/Home/Home";

// importaciones desde pages
// import { Layout } from "./pages/Layout";
// import PasswordRecovery from "./pages/PasswordRecovery";
// import Home from "./pages/Home";

// css;
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/recuperacion" element={<PasswordRecovery />} />
          <Route path="/search" element={<FlightSearch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

// ! Version con el router de emmanuel
// import Routes from "./router/Routes";

// function App() {
//   return (
//     <div>
//       <Routes />
//     </div>
//   );
// }

// export default App;
