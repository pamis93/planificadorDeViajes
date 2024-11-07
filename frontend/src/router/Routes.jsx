import { Routes, Route } from 'react-router-dom';
import PasswordResetPage from '../pages/PasswordResetPage';


function AppRoutes() {
  return (
    <Routes>
      {/* Otras rutas */}
      <Route path="/recuperacion" element={<PasswordResetPage />} />
    </Routes>
  );
}

export default AppRoutes;
