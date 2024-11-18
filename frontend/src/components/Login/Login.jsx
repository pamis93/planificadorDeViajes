import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [user, setUser] = useUser();
    console.log('👤 Estado actual del usuario:', user);
    
    const navigate = useNavigate();

    const [message, setMessage] = useState({ 
        text: '',  
        type: ''   
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                if (data.data && data.data.token) {
                    console.log('✅ Login exitoso - Token recibido');
                    localStorage.setItem('token', data.data.token);
                    setUser({
                        token: data.data.token,
                        email: email
                    });
                    setMessage({ text: data.message, type: 'success' });
                }
            } else {
                setMessage({ text: data.message, type: 'error' });
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage({ text: 'Error al conectar con el servidor', type: 'error' });
        }
    };

    const closeModal = () => {
        navigate("/"); 
    };

    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <div className="relative w-[80vw] max-w-[450px] p-5 rounded-lg text-white text-center bg-cover bg-center bg-no-repeat bg-img-login">
                
                {/* Overlay para bajar la opacidad de la imagen */}
                <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
                
                <h2 className="relative text-xl md:text-2xl mt-6 mb-6 z-10">BIENVENIDO/A DE VUELTA</h2>
                <button 
                    onClick={closeModal}
                    className="top-1 right-2 absolute text-red-700 py-2 px-3 rounded-full mt-0 hover:text-orange-500 transition-colors bg-transparent border-none">X</button>
                
                <form onSubmit={handleSubmit} className="relative z-10">
                    <label className="block mt-4 text-sm font-bold text-white">EMAIL</label>
                    <input 
                        className="appearance-none w-[80%] md:w-full p-3 my-2 rounded-lg bg-[#686E9E] border-2 border-black text-white text-sm placeholder-white"
                        type="email" 
                        name="email"
                        placeholder="Enter Your Email..." 
                        required
                    />
                    
                    <label className="block mt-4 text-sm font-bold text-white">CONTRASEÑA</label>
                    <input 
                        className="appearance-none w-[80%] md:w-full p-3 my-2 rounded-lg bg-[#686E9E] border-2 border-black text-white text-sm placeholder-white"
                        type="password" 
                        name="password"
                        placeholder="Enter Your Password..." 
                        required
                    />
                    
                    <div className="flex justify-between items-center mt-4 text-sm text-gray-300">
                        <label className="flex items-center text-white">
                            <input 
                                type="checkbox" 
                                className="mr-2 w-4 h-4 text-black"
                                name="remember"
                            /> Remember Me
                        </label>
                        <a href="/recuperacion" className="text-blue-500">Forgot Password?</a>
                    </div>
                    
                    <button type="submit" className="w-full p-3 mt-4 bg-[#F66136] text-black font-bold border border-white rounded-lg text-sm">
                        Iniciar Sesión
                    </button>
                </form>
                
                {message.text && (
                    <p className={`mt-4 p-2 text-sm ${message.type === 'error' ? 'text-red-500' : 'text-green-500'} relative z-10`}>
                        {message.text}
                    </p>
                )}
                
                <p className="mt-4 text-sm relative z-10">
                    ¿Aún no tienes una cuenta? 
                    <a href="/register" className="text-blue-500 ml-2">REGÍSTRATE</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
