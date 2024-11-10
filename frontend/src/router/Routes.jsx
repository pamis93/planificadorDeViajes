import { Routes, Route } from 'react-router-dom';
import PasswordResetPage from '../pages/PasswordResetPage';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';

function AppRoutes() {
  return (
    <Routes>
      {/* Otras rutas */}
      <Route path="/recuperacion" element={<PasswordResetPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRoutes;