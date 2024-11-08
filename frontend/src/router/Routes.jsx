import { Routes, Route } from 'react-router-dom';
import PasswordResetPage from '../pages/PasswordResetPage';
import AccountActivation from '../components/AccountActivation/AccountActivation';
import Header from '../components/Header/Header';
import '../output.css'



function AppRoutes() {
  return (
    <>
    <Header/>
      <Routes>
        {/* Otras rutas */}
        <Route path="/recuperacion" element={<PasswordResetPage />} />
        <Route path="/users/validate/:registrationCode" element={<AccountActivation/>} />
      </Routes>
    </>
  );
}

export default AppRoutes;
