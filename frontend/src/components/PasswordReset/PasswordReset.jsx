import { useState } from 'react';
import './PasswordReset.css';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:3001/users/password',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, recoverPassCode: code, newPassword }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || 'Contraseña actualizada con éxito.');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Error al actualizar la contraseña.');
      }
    } catch (error) {
      setMessage('Ocurrió un error: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Restablecer Contraseña</h2>
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
        <label>
          Código de Verificación:
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </label>
        <label>
          Nueva Contraseña:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Repetir Nueva Contraseña:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="submit-button">
          Restablecer
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default PasswordReset;