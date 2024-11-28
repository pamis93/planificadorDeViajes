import { useState } from 'react';
import { useParams } from 'react-router-dom';

function PasswordReset() {
  const { code } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage({ text: 'Las contraseñas no coinciden.', type: 'error' });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/users/password/${code}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ recoverPassCode: code, newPassword }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage({
          text: data.message || 'Contraseña actualizada con éxito.',
          type: 'success',
        });
      } else {
        const errorData = await response.json();
        setMessage({
          text: errorData.message || 'Error al actualizar la contraseña.',
          type: 'error',
        });
      }
    } catch (error) {
      setMessage({
        text: 'Ocurrió un error: ' + error.message,
        type: 'error',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#9AA5BC] text-white">
      <div
        className="bg-black bg-opacity-50 p-10 rounded-lg shadow-lg w-[500px] text-center bg-cover bg-center"
        style={{ backgroundImage: `url('/fondoLogin.png')` }}
      >
        <h2 className="text-2xl font-bold mb-6">Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-lg font-semibold mt-10 mb-2 text-white">
            Nueva Contraseña:
          </label>
          <input
            className="placeholder:text-gray-300 w-full p-3 mb-4 border rounded-lg bg-[#686e9e] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Ingrese su nueva contraseña"
            required
          />
          <label className="block text-lg font-semibold mt-4 mb-2 text-white">
            Repetir Nueva Contraseña:
          </label>
          <input
            className="placeholder:text-gray-300 w-full p-3 mb-4 border rounded-lg bg-[#686e9e] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme su nueva contraseña"
            required
          />
          <button
            type="submit"
            className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 rounded-lg transition"
          >
            Restablecer Contraseña
          </button>
        </form>

        {message.text && (
          <p
            className={`mt-4 text-lg ${
              message.type === 'success' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {message.text}
          </p>
        )}

        <p className="mt-20 text-sm">
          ¿Ya recuerdas tu contraseña?{' '}
          <a
            href="/login"
            className="text-[#046ef8] font-semibold text-lg hover:underline"
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}

export default PasswordReset;
