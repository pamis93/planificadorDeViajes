import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import './Register.css';

function Register() {
    const [message, setMessage] = useState('');
    const [user, setUser] = useUser();


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
            setMessage('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    lastName,
                    username,
                    email,
                    password
                })
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
                setMessage(data.message); // Mensaje de éxito
            } else {
                setMessage(data.message); // Mensaje de error
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error al conectar con el servidor');
        }
    };

    return (
        <div className="register-container">
            <div className="register-content">
                <h2 className="ttle">CREAR CUENTA</h2>
                <button className="close-btn">X</button>

                <form onSubmit={handleSubmit}>
                    <div className="name-surname">
                        <div className="input-group">
                            <label>NOMBRE</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre..."
                                required
                            />
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

                    <label>NOMBRE DE USUARIO</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="UserName..."
                        required
                    />

                    <label>EMAIL</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo Electronico..."
                        required
                    />

                    <label>CONTRASEÑA</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña..."
                        required
                    />

                    <label>CONFIRMAR CONTRASEÑA</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmar Contraseña..."
                        required
                    />

                    <button type="submit" className="login-button">
                        Registrarse
                    </button>
                </form>

                {message && (
                    <p className={`message ${message.includes('error') ? 'error' : 'success'}`}>
                        {message}
                    </p>
                )}

                <p className="register-text">
                    ¿Ya tienes una cuenta? 
                    <a href="/login" className="register-link">INICIAR SESIÓN</a>
                </p>
            </div>
        </div>
    );
}

export default Register;

