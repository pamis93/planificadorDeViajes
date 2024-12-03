import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../context/UserContext';

function Login() {
  const [, setUser] = useUser();
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
            console.log('ID usuario:', decodedtoken.id);
          } catch (error) {
            console.error(error);
          }
          setUser({
            id: decodedtoken.id,
            token: data.data.token,
            email: email,
          });

          toast.success(data.message || 'Inicio de sesión exitoso.', {
            position: 'bottom-center',
          });

          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        }
      } else {
        toast.error(data.message || 'Credenciales incorrectas.', {
          position: 'bottom-center',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al conectar con el servidor.', {
        position: 'top-right',
      });
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-cover bg-center bg-[#9AA5BC] text-white">
      <div
        className="bg-black bg-opacity-50 p-10  mt-60 sm:mt-20  rounded-lg shadow-lg w-[500px] h-[750px] text-center"
        style={{ backgroundImage: `url('/fondoLogin.png')` }}
      >
        <h2 className="text-2xl font-bold mb-6">BIENVENIDO/A DE VUELTA</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-lg font-semibold mt-10 mb-2 text-white">
            EMAIL
          </label>
          <input
            className="placeholder:text-gray-300 w-full p-3 mb-4 border rounded-lg bg-[#686e9e] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            name="email"
            placeholder="Enter Your Email..."
            required
          />
          <label className="block text-lg font-semibold mt-10 mb-2 text-white">
            CONTRASEÑA
          </label>
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

          <p className="text-sm mb-10">
            <a
              href="/recuperacion"
              className="text-[#046ef8] font-semibold text-lg hover:underline"
            >
              olvidaste la contraseña?
            </a>
          </p>

          <button
            type="submit"
            className="mt-10 w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 rounded-lg transition"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="mt-20 text-sm">
          ¿Aún no tienes una cuenta?{' '}
          <a
            href="/register"
            className="text-[#046ef8] font-semibold text-lg hover:underline"
          >
            REGÍSTRATE
          </a>
        </p>
      </div>      
      <ToastContainer />
    </div>
  );
}

export default Login;