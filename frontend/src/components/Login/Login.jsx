import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import './Login.css';

function Login() {
  const [user, setUser] = useUser();
  // NUEVO: Log del estado actual del usuario
  console.log('👤 Estado actual del usuario:', user);

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
          // NUEVO: Log de login exitoso
          console.log('✅ Login exitoso - Token recibido');

         // localStorage.setItem('token', data.data.token);

          setUser({
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
    <div className="login-container">
      <div className="login-content">
        <h2 className="ttle">BIENVENIDO/A DE VUELTA</h2>
        <button className="closse-btn">X</button>

        <form onSubmit={handleSubmit}>
          <label>EMAIL</label>
          <input
            className="email"
            type="email"
            name="email"
            placeholder="Enter Your Email..."
            required
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
              className={`eye-iconL ${showPassword ? 'open' : 'closed'}`}
              onClick={handlePasswordVisibility}
            >
              {showPassword ? '🙉' : '🙈'}
            </span>
          </div>

          <div className="options">
            <label>
              <input type="checkbox" name="remember" /> Remember Me
            </label>
            <a href="/recuperacion" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>

        {message.text && (
          <p className={`message ${message.type}`}>{message.text}</p>
        )}

        <p className="register-text">
          ¿Aún no tienes una cuenta?
          <a href="/register" className="register-link">
            REGISTRATE
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
