import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const lastName = e.target.lastName.value;
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // Validación de que las contraseñas coincidan
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          lastName,
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccessModalOpen(true); // Mostrar modal en caso de éxito
      } else {
        toast.error(data.message || 'Error en el registro', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      toast.error('Error al conectar con el servidor', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    window.location.href = '/login';
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-cover bg-center bg-[#9AA5BC] text-white">
      <div
        className="bg-black bg-opacity-50 p-10 mt-10 rounded-lg shadow-lg w-[500px] text-center"
        style={{ backgroundImage: `url('/fondoLogin.png')` }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">CREAR CUENTA</h2>
        <form onSubmit={handleSubmit}>
          {/* Nombre y Apellido */}
          <div className="flex justify-between gap-4 mb-6">
            <div className="w-1/2">
              <label className="block text-lg font-semibold mb-2 text-white">NOMBRE</label>
              <input
                className="w-full p-3 border rounded-lg bg-[#686e9e] text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="name"
                placeholder="Nombre..."
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-lg font-semibold mb-2 text-white">APELLIDO</label>
              <input
                className="w-full p-3 border rounded-lg bg-[#686e9e] text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="lastName"
                placeholder="Apellido..."
                required
              />
            </div>
          </div>

          {/* Nombre de usuario */}
          <label className="block text-lg font-semibold mb-2 text-white">NOMBRE DE USUARIO</label>
          <input
            className="w-full p-3 mb-4 border rounded-lg bg-[#686e9e] text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="username"
            placeholder="Nombre de usuario..."
            required
          />

          {/* Email */}
          <label className="block text-lg font-semibold mb-2 text-white">CORREO ELECTRÓNICO</label>
          <input
            className="w-full p-3 mb-4 border rounded-lg bg-[#686e9e] text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            name="email"
            placeholder="Correo Electrónico..."
            required
          />

          {/* Contraseña */}
          <label className="block text-lg font-semibold mb-2 text-white">CONTRASEÑA</label>
          <div className="relative mb-4">
            <input
              className="w-full p-3 border rounded-lg bg-[#686e9e] text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Confirmar contraseña */}
          <label className="block text-lg font-semibold mb-2 text-white">CONFIRMAR CONTRASEÑA</label>
          <div className="relative mb-4">
            <input
              className="w-full p-3 border rounded-lg bg-[#686e9e] text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirmar Contraseña..."
              required
            />
            <span
              className="absolute right-5 top-2 text-xl text-gray-400 cursor-pointer"
              onClick={handlePasswordVisibility}
            >
              {showPassword ? '🙉' : '🙈'}
            </span>
          </div>

          {/* Botón de registro */}
          <button
            type="submit"
            className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 rounded-lg transition"
          >
            REGISTRARSE
          </button>
        </form>

        {/* Texto de inicio de sesión */}
        <p className="mt-6 text-sm">
          ¿Ya tienes una cuenta?{' '}
          <a href="/login" className="text-[#046ef8] font-semibold hover:underline">
            INICIAR SESIÓN
          </a>
        </p>
      </div>

      {/* Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 text-center w-full max-w-md mx-4">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Registro Exitoso</h2>
            <p className="mb-6 text-gray-700 text-base">
              Tu cuenta ha sido creada exitosamente. En breves momentos, recibirás un email para activar tu cuenta.
            </p>
            <button 
              onClick={handleSuccessModalClose}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition duration-300 ease-in-out"
            >
              Ir a Iniciar Sesión
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Register;