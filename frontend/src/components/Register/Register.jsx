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
  const [showPassword, setShowPassword] = useState(false);

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

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className="register-container">
      <div className="register-content">
        <h2 className="ttle">CREAR CUENTA</h2>
        <button className="close-btn">X</button>

        <form className="form" onSubmit={handleSubmit}>
          <div className="name-surname">
            <div className="input-group">
              <label>NOMBRE</label>
              <input type="text" name="name" placeholder="Nombre..." required />
            </div>
            <div className="input-group">
              <label>APELLIDO</label>
              <input
                type="text"
                name="lastName"
                placeholder="Apellido..."
                required
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

          <label>CONTRASEÑA</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Contraseña..."
              required
            />
            <span
              className={`eye-icon ${showPassword ? 'open' : 'closed'}`}
              onClick={handlePasswordVisibility}
            >
              {showPassword ? '🙉' : '🙈'}
            </span>
          </div>

          <label>CONFIRMAR CONTRASEÑA</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirmar Contraseña..."
              required
            />
            <span
              className={`eye-icon ${showPassword ? 'open' : 'closed'}`}
              onClick={handlePasswordVisibility}
            >
              {showPassword ? '🙉' : '🙈'}
            </span>
          </div>

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
  
  );
}

export default Register;
