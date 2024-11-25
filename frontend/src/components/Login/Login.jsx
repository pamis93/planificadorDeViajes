import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext'; 
import { useNavigate } from 'react-router-dom';

function Login() {
    const [user, setUser] = useUser();
    const navigate = useNavigate();

    const [message, setMessage] = useState({
        text: '',
        type: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (user && user.token) {
            setMessage({
                text: 'Ya has iniciado sesión',
                type: 'info',
            });

            const redirectTimeout = setTimeout(() => {
                navigate('/');
            }, 2000);

            return () => clearTimeout(redirectTimeout);
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

            const text = await response.text();

            try {
                const data = JSON.parse(text);

                if (response.ok) {
                    if (data.data && data.data.token) {
                        let decodedToken;
                        try {
                            decodedToken = JSON.parse(atob(data.data.token.split('.')[1]));
                        } catch (e) {
                            console.error('Error al decodificar el token:', e);
                        }

                        setUser({
                            id: decodedToken.id,
                            token: data.data.token,
                            email: email,
                        });

                        setMessage({
                            text: data.message,
                            type: 'success',
                        });
                        navigate('/');
                    }
                } else {
                    setMessage({
                        text: data.message,
                        type: 'error',
                    });
                }
            } catch (jsonError) {
                setMessage({
                    text: 'Error al procesar la respuesta del servidor.',
                    type: 'error',
                });
            }
        } catch (error) {
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
            {user && user.token ? (
                <div className="text-center bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-lg font-bold text-gray-700">Ya has iniciado sesión. Redirigiendo...</p>
                </div>
            ) : (
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">BIENVENIDO/A DE VUELTA</h2>
                    {message.text && (
                        <p className={`mb-4 text-center ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                            {message.text}
                        </p>
                    )}
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-semibold text-gray-600">EMAIL</label>
                            <input
                                className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                type="email"
                                name="email"
                                placeholder="Enter Your Email..."
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-sm font-semibold text-gray-600">CONTRASEÑA</label>
                            <div className="relative">
                                <input
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Contraseña..."
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 text-gray-600"
                                    onClick={handlePasswordVisibility}
                                >
                                    {showPassword ? '🙉' : '🙈'}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span className="text-sm text-gray-600">Remember Me</span>
                            </label>
                            <a href="/recuperacion" className="text-sm text-blue-600 hover:underline">
                                Forgot Password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Iniciar Sesión
                        </button>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-600">
                        ¿Aún no tienes una cuenta?{' '}
                        <a href="/register" className="text-blue-600 hover:underline">
                            REGÍSTRATE
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
}

export default Login;
