import { Route, Routes } from 'react-router-dom';

// importaciones desde componentes
import FlightSearch from './components/FlightSearch/FlightSearch';
import { Layout } from './components/Layout/Layout';
import PasswordRecovery from './components/PasswordRecovery/PasswordRecovery';
import PasswordReset from './components/PasswordReset/PasswordReset';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { UsersList } from './components/UsersList/UsersList';
import AccountActivation from './components/AccountActivation/AccountActivation';
import { UserInfo } from './components/UsersList/UserInfo';

// css;
/* import './App.css'; */

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/users/validate/:registrationCode' element={<AccountActivation/>} />
          <Route path="/recuperacion" element={<PasswordRecovery />} />
          <Route path="/reset/:code" element={<PasswordReset />} />
          <Route path="/search" element={<FlightSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/users/:id" element={<UserInfo />} />
          <Route path="/users/validate/:registrationCode" element={<AccountActivation />}
          /> 
        </Route>
      </Routes>
    </>
  );
}

export default App;
