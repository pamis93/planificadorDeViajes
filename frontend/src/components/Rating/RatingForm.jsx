import { useState } from 'react';
import { useUser } from '../../context/UserContext';

const RatingForm = ({ fetchComments }) => {
  const [rating, setRating] = useState(0); // Estado puntuación
  const [comment, setComment] = useState(''); // Estado comentario
  const [user] = useUser(); // Obtenemos el usuario del contexto
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // comprueba si hay datos
    if (rating > 0 && comment) {
      try {
        // Enviar la valoración al backend
        const res = await fetch('http://localhost:3001/ratings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.token,
          },
          body: JSON.stringify({ rating, comment }),
        });

        if (comment.length > 500) {
          setError(
            'Vaya! sentimos limitarte pero tenemos un maximo de 500 caracteres. Discula las molestias!'
          );
          return;
        }

        if (!res.ok) {
          const errorData = await res.json();
          // Si falla por valoracion existente muestra esto
          if (
            res.status === 403 &&
            errorData.message === 'El usuario ya ha realizado una valoración'
          ) {
            setError('Hubo un problema al agregar la valoración.');
          } else {
            setError(
              'Parece que ya nos ha valorado! solo admitimos una valoracion, pero puedes modificarla o eliminarla!'
            );
          }
          return;
        }

        // Si la valoración funciona, limpia campos
        setRating(0);
        setComment('');
        fetchComments(); // actualizacion de comentarios
      } catch (err) {
        console.error('Error al enviar el comentario:', err);
        setError(
          'Debes estar registrado para poder valorar la pagina! sentimos las molestias!'
        );
      }
    } else {
      setError('Por favor, proporciona una puntuación y un comentario.');
    }
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto bg-zinc-200"
    >
      {error && (
        <p className="text-red-500 mb-4 text-center font-semibold">{error}</p>
      )}
      {/* Componente de estrellas */}
      <div className="mb-6 flex justify-center">
        {Array.from({ length: 5 }, (_, index) => (
          <svg
            key={index}
            className={`w-8 h-8 cursor-pointer transition-transform duration-200 ease-in-out ${
              rating > index
                ? 'text-yellow-400 scale-110'
                : 'text-gray-400 hover:text-yellow-400'
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
            onClick={() => handleStarClick(index + 1)} // Actualiza el estado de rating
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.433-.767l-1.302-5.006 3.91-3.505a1.53 1.53 0 0 0 .353-1.538z" />
          </svg>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Escribe tu comentario aquí"
        className="border-2 border-gray-300 p-3 w-full mb-6 rounded-md focus:ring-2"
      />
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-700 transition-all"
      >
        Enviar valoración
      </button>
    </form>
  );
};

export default RatingForm;
