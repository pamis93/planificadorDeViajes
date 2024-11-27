import { useState } from 'react';

function PasswordRecovery() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({
    text: '',
    type: '',
  });

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
        setMessage({
          text: data.message || 'Correo de recuperación enviado.',
          type: 'success',
        });
      } else {
        setMessage({
          text: 'Error al enviar la solicitud de recuperación.',
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
        <h2 className="text-2xl font-bold mb-6">RECUPERAR CONTRASEÑA</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-lg font-semibold mt-10 mb-2 text-white">
            EMAIL
          </label>
          <input
            className="placeholder:text-gray-300 w-full p-3 mb-4 border rounded-lg bg-[#686e9e] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su correo..."
            required
          />
          <button
            type="submit"
            className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 rounded-lg transition"
          >
            Enviar
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
          ¿Recuerdas tu contraseña?{' '}
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

export default PasswordRecovery;
