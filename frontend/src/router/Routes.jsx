import { Routes, Route } from 'react-router-dom';
import PasswordResetPage from '../pages/PasswordResetPage';
import Login from '../components/login/login';
import Register from '../components/Register/Register';

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