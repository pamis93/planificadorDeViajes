//import { Route } from 'react-router-dom';
import Routes from './router/Routes';
import './index.css';

//import AccountActivation from './components/AccountActivation/AccountActivation';

function App() {
  return (
    <div>
      <Routes>
      {/* <Route path="/users/validate/:registrationCode" element={<AccountActivation/>} /> */}
      </Routes>
    </div>
  );
}

export default App;