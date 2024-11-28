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
import EditUser from './components/EditUser/EditUser';
import NotFound from './components/NotFound/NotFound';
import FavList from './components/FavList/FavList';
import RatingAndComments from './components/Rating/RatingAndComments';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/search" element={<FlightSearch />} />
          <Route path="/search/results?" element={<FlightResults />} />

          <Route path="/admin/users" element={<UsersList />} />

          <Route path="/register" element={<Register />} />
          <Route
            path="/users/validate/:registrationCode"
            element={<AccountActivation />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/edituser" element={<EditUser />} />
          <Route path="/recuperacion" element={<PasswordRecovery />} />

          <Route path="/reset/:code" element={<PasswordReset />} />
          <Route path="/ratings" element={<RatingAndComments />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin/users/:id" element={<UserInfo />} />
          <Route path="/users/:usuario_id/favoritos" element={<FavList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
