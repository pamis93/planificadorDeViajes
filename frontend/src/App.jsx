import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import PasswordResetPage from "../src/components/PasswordResetPage/PasswordResetPage";
import AccountActivation from "../src/components/AccountActivation/AccountActivation";
/* import FlightSerach from '../src/components/FlightSearch/FlightSearch'; */
import "./index.css";

// import AppRouter from './router/Routes';

function App() {
    return (
        <>
            <Header />
            <Routes>
                {/* Otras rutas */}
                {/* <Route path="/" element={<FlightSerach/>}/> */}
                <Route path="/recuperacion" element={<PasswordResetPage/>} />
                <Route
                    path="/users/validate/:registrationCode"
                    element={<AccountActivation />}
                />
            </Routes>
        </>
    );
}

export default App;
