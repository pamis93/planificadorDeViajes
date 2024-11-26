import { useState } from 'react';


function PasswordRecovery() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:3001/users/password/recover',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || 'Correo de recuperación enviado.');
      } else {
        setMessage('Error al enviar la solicitud de recuperación.');
      }
    } catch (error) {
      setMessage('Ocurrió un error: ' + error.message);
    }
  };

  return (
    <div className="container" style={{ backgroundImage: `url('/fondoLogin.png')` }}>
      <h2>Recuperación de Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Correo Electrónico:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="submit-button">
          Enviar
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default PasswordRecovery;
