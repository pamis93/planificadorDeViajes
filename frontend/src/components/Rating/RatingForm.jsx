import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';

const RatingForm = ({ fetchComments }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [user] = useUser();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating > 0 && comment) {
      try {
        const res = await fetch('http://localhost:3001/ratings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${user.token}`,
          },
          body: JSON.stringify({ rating, comment }),
        });
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        await res.json();

        setRating(0);
        setComment('');
        fetchComments();
      } catch (err) {
        console.error('Error al enviar el comentario:', err);
        setError('Hubo un problema al enviar el comentario.');
      }
    } else {
      setError('Por favor, proporciona una puntuación y un comentario.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="rating"
        >
          Puntuación:
        </label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="0">Selecciona una puntuación</option>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
      </div>
      <div className="mb-4 w-2/3">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="comment"
        >
          Comentario:
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Escribe tu comentario aquí..."
        />
      </div>
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Enviar
      </button>
    </form>
  );
};

export default RatingForm;
