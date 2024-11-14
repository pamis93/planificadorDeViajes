import { Route, Routes } from 'react-router-dom';

// importaciones desde componentes
import FlightSearch from './components/FlightSearch/FlightSearch';
import { Layout } from './components/Layout/Layout';
import PasswordRecovery from './components/PasswordRecovery/PasswordRecovery';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { UsersList } from './components/UsersList/UsersList';

// css;
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/recuperacion" element={<PasswordRecovery />} />
          <Route path="/search" element={<FlightSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/users" element={<UsersList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
