import { useState } from 'react';
import './Login.css';

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState({ 
        text: '',  
        type: ''   
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();


            if (response.ok) {
                if (data.data && data.data.token) {
                    localStorage.setItem('token', data.data.token);
                    
                    setMessage({ 
                        text: data.message || 'Login exitoso', 
                        type: 'success' 
                    });
                }
            } else {
                setMessage({ 
                    text: data.message || 'Error en las credenciales', 
                    type: 'error' 
                });
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage({ 
                text: 'Error al conectar con el servidor', 
                type: 'error' 
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <h2 className='ttle'>BIENVENIDO/A DE VUELTA</h2>
                <button className='close-btn'>X</button>
                
                <form onSubmit={handleSubmit}>
                    <label>EMAIL</label>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Your Email..." 
                        required
                    />
                    
                    <label>CONTRASEÑA</label>
                    <input 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter Your Password..." 
                        required
                    />

                    <div className="options">
                        <label>
                            <input 
                                type="checkbox" 
                                name="remember"
                                onChange={handleChange}
                            /> Remember Me
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
                    <p className={`message ${message.type}`}>
                        {message.text}
                    </p>
                )}
                
                <p className="register-text">
                    ¿Aún no tienes una cuenta? 
                    <a href="/register" className="register-link">REGISTRATE</a>
                </p>
            </div>
        </div>
    );
}

export default Login;