import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [user, setUser] = useUser();

  const navigate = useNavigate();

  const [message, setMessage] = useState({
    text: '',
    type: '',
  });

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
      setMessage({
        text: 'Las contraseñas no coinciden',
        type: 'error',
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
        // Si el registro es exitoso, actualizamos el estado del usuario
        setUser({
          ...user,
          name,
          lastName,
          username,
          email,
          // Puedes agregar más detalles del usuario si es necesario
        });
        setMessage({
          text: data.message,
          type: 'success',
        });
      } else {
        setMessage({
          text: data.message,
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error al conectar con el servidor');
    }
  };

  const closeModal = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen mt-8"> 
      {/* Contenedor del modal */}
      <div className="relative w-[90vw] max-w-[500px] p-5 rounded-lg text-white text-center bg-cover bg-center bg-no-repeat bg-img-login">
        
        {/* Fondo oscuro solo dentro del tamaño del modal */}
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg z-0"></div>

        {/* Contenido del modal */}
        <div className="relative z-10">
          <h2 className="text-xl md:text-3xl mb-4">CREAR CUENTA</h2> 
          <button
            onClick={closeModal}
            className="top-1 right-2 absolute text-red-700 py-2 px-3 rounded-full mt-0 hover:text-orange-500 transition-colors bg-transparent border-none"
          >
            X
          </button>

          <form className="form" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4"> 
              <div className="input-group">
                <label className="block mt-4 text-sm md:text-base font-bold text-white">NOMBRE</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre..."
                  required
                  className="w-full p-3 my-2 rounded-lg bg-[#686E9E] border-2 border-black text-white text-sm md:text-base placeholder-white"
                />
              </div>
              <div className="input-group">
                <label className="block mt-4 text-sm md:text-base font-bold text-white">APELLIDO</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Apellido..."
                  required
                  className="w-full p-3 my-2 rounded-lg bg-[#686E9E] border-2 border-black text-white text-sm md:text-base placeholder-white"
                />
              </div>
            </div>

            <label className="block mt-4 text-sm md:text-base font-bold text-white">NOMBRE DE USUARIO</label>
            <input
              type="text"
              name="username"
              placeholder="UserName..."
              required
              className="w-full p-3 my-2 rounded-lg bg-[#686E9E] border-2 border-black text-white text-sm md:text-base placeholder-white"
            />

            <label className="block mt-4 text-sm md:text-base font-bold text-white">EMAIL</label>
            <input
              type="email"
              name="email"
              placeholder="Correo Electronico..."
              required
              className="w-full p-3 my-2 rounded-lg bg-[#686E9E] border-2 border-black text-white text-sm md:text-base placeholder-white"
            />

            <label className="block mt-4 text-sm md:text-base font-bold text-white">CONTRASEÑA</label>
            <input
              type="password"
              name="password"
              placeholder="Contraseña..."
              required
              className="w-full p-3 my-2 rounded-lg bg-[#686E9E] border-2 border-black text-white text-sm md:text-base placeholder-white"
            />

            <label className="block mt-4 text-sm md:text-base font-bold text-white">CONFIRMAR CONTRASEÑA</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar Contraseña..."
              required
              className="w-full p-3 my-2 rounded-lg bg-[#686E9E] border-2 border-black text-white text-sm md:text-base placeholder-white"
            />

            <button
              type="submit"
              className="w-full p-3 mt-4 bg-[#F66136] text-black font-bold border border-white rounded-lg text-sm md:text-base"
            >
              Registrarse
            </button>
          </form>

          {message.text && (
            <p className={`mt-4 p-2 text-lg md:text-xl ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
              {message.text}
            </p>
          )}

          <p className="mt-4 text-sm md:text-base">
            ¿Ya tienes una cuenta?{' '}
            <a href="/login" className="text-blue-500 ml-2">
              INICIAR SESIÓN
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
