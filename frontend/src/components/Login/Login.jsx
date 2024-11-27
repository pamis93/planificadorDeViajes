import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext'; 
import { useNavigate } from 'react-router-dom';


function Login() {
    const [user, setUser] = useUser();
    /* const navigate = useNavigate(); */

  const [message, setMessage] = useState({
    text: '',
    type: '',
  });
  const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

    try {
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.data && data.data.token) {

          let decodedtoken;
          try {
            decodedtoken = JSON.parse(atob(data.data.token.split('.')[1]));
            console.log('ID usuario:' , decodedtoken.id);
            
            
          } catch (error) {
            console.error(error);
            
          }
          setUser({
            id: decodedtoken.id,
            token: data.data.token,
            email: email,
          });

          setMessage({
            text: data.message,
            type: 'success',
          });
        }
      } else {
        setMessage({
          text: data.message,
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({
        text: 'Error al conectar con el servidor',
        type: 'error',
      });
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-cover bg-center bg-[#9AA5BC] text-white">
      <div className="bg-black bg-opacity-50 p-10 mt-20 rounded-lg shadow-lg w-[500px] h-[750px] text-center"
      style={{ backgroundImage: `url('/fondoLogin.png')` }}>

        <h2 className="text-2xl font-bold mb-6">BIENVENIDO/A DE VUELTA</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-lg font-semibold mt-10 mb-2 text-white">EMAIL</label>
          <input
            className="placeholder:text-gray-300 w-full p-3 mb-4 border rounded-lg bg-[#686e9e] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            name="email"
            placeholder="Enter Your Email..."
            required
          />
          <label className="block text-lg font-semibold mt-10 mb-2 text-white">CONTRASEÑA</label>
          <div className="relative mb-4">
            <input
              className="placeholder:text-gray-300 w-full p-3 border rounded-lg bg-[#686e9e] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Contraseña..."
              required
            />
            <span
              className="absolute right-5 top-2 text-xl text-gray-400 cursor-pointer"
              onClick={handlePasswordVisibility}
            >
              {showPassword ? '🙉' : '🙈'}
            </span>
          </div>

          <p className="text-sm">
            <a href="/recuperacion" className="text-[#046ef8] font-semibold text-lg hover:underline">
              olvidaste la contraseña?
            </a>
          </p>

          <button
            type="submit"
            className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 rounded-lg transition"
          >
            Iniciar Sesión
          </button>
        </form>

        {message.text && (
          <p
            className={`mt-4 text-lg ${
              message.type === 'success' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {message.text}
          </p>
        )}

        <p className="mt-20 text-sm">
          ¿Aún no tienes una cuenta?{' '}
          <a href="/register" className="text-[#046ef8] font-semibold text-lg hover:underline">
            REGÍSTRATE
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;