import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext'; // Asegúrate de que tienes este contexto configurado
import { useNavigate } from 'react-router-dom';

function Login() {
    const [user, setUser] = useUser();
    const navigate = useNavigate();

    const [message, setMessage] = useState({
        text: '',
        type: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    // Verifica si el usuario ya está autenticado
    useEffect(() => {
        if (user && user.token) {
            setMessage({
                text: 'Ya has iniciado sesión',
                type: 'info',
            });

            // Redirige a la página principal o a otra ruta después de 2 segundos
            const redirectTimeout = setTimeout(() => {
                navigate('/');
            }, 2000);

            return () => clearTimeout(redirectTimeout); // Limpia el timeout si el componente se desmonta
        }
    }, [user, navigate]);

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
                body: JSON.stringify({ email, password }),
            });

            const text = await response.text(); // Leemos la respuesta como texto
            console.log('Respuesta como texto:', text); // Muestra la respuesta en texto

            try {
                const data = JSON.parse(text);
                console.log('Respuesta JSON:', data);

                if (response.ok) {
                    if (data.data && data.data.token) {
                        console.log('✅ Login exitoso - Token recibido');

                        // Decodifica el token para obtener información adicional (opcional)
                        try {
                            const decodedToken = JSON.parse(atob(data.data.token.split('.')[1]));
                            console.log('ID del usuario en el token:', decodedToken.id);
                        } catch (e) {
                            console.error('Error al decodificar el token:', e);
                        }

                        setUser({
                            token: data.data.token,
                            email: email,
                        });

                        setMessage({
                            text: data.message,
                            type: 'success',
                        });
                        navigate('/'); // Redirige al home
                    }
                } else {
                    setMessage({
                        text: data.message,
                        type: 'error',
                    });
                }
            } catch (jsonError) {
                console.error('Error al intentar convertir la respuesta en JSON:', jsonError);
                setMessage({
                    text: 'Error al procesar la respuesta del servidor.',
                    type: 'error',
                });
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            setMessage({
                text: 'Error al conectar con el servidor',
                type: 'error',
            });
        }
    };

    const handlePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    useEffect(() => {
        if (user) {
            localStorage.setItem('session', JSON.stringify(user));
        }
    }, [user]);

    return (
        <div className="login-container">
            {user && user.token ? (
                // Mostrar mensaje si el usuario ya está autenticado
                <div className="login-message">
                    <p className="message info">Ya has iniciado sesión. Redirigiendo...</p>
                </div>
            ) : (
                // Mostrar formulario de inicio de sesión
                <div className="login-content">
                    <h2 className="ttle">BIENVENIDO/A DE VUELTA</h2>
                    <button className="closse-btn">X</button>

                    {message.text && (
                        <p className={`message ${message.type}`}>{message.text}</p>
                    )}

                    <form onSubmit={handleSubmit}>
                        <label>EMAIL</label>
                        <input
                            className="email text-black"
                            type="email"
                            name="email"
                            placeholder="Enter Your Email..."
                            required
                        />

                        <label>CONTRASEÑA</label>
                        <div className="password-input text-black">
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

                    <p className="register-text">
                        ¿Aún no tienes una cuenta?{' '}
                        <a href="/register" className="register-link">
                            REGÍSTRATE
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
}

export default Login;
