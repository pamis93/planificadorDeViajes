import { useState, useEffect } from 'react';
import RatingForm from './RatingForm';
import CommentList from './CommentList';

const RatingAndComments = () => {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await fetch('http://localhost:3001/ratings');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      setComments(responseData.data); // Guardamos los comentarios en el estado
    } catch (err) {
      console.error('Error al obtener los comentarios:', err);
      setMessage({
        type: 'error',
        text: 'Hubo un problema al obtener los comentarios.',
      });
    }
  };

  useEffect(() => {
    fetchComments(); // Llamamos a la función para obtener los comentarios al cargar
  }, []);

  const sortedComments = comments
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Ordenamos los comentarios por fecha

  return (
    <div
      className="mx-auto pt-12 p-4 sm:p-8 bg-cover bg-fixed bg-center w-full min-h-screen"
      style={{ backgroundImage: `url('/paris.jpg')` }}
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-center font-bold mt-10 mb-20 pt-20 drop-shadow-lg">
        <span className="text-orange-500">D</span>
        <span className="text-white">ejanos tu </span>
        <span className="text-orange-500">O</span>
        <span className="text-white">pinión!</span>
      </h1>

      {message && (
        <div
          className={`text-center mb-4 p-2 rounded ${message.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
        >
          {message.text}
        </div>
      )}

      {/* Pasamos fetchComments como prop a RatingForm para que pueda actualizar los comentarios */}
      <RatingForm fetchComments={fetchComments} />

      {sortedComments && sortedComments.length > 0 ? (
        sortedComments.map((comment) => (
          <CommentList
            key={comment.id}
            comment={comment}
            comments={comments}
            setComments={setComments}
            o
          />
        ))
      ) : (
        <p className="text-center">No hay comentarios disponibles</p>
      )}
    </div>
  );
};

export default RatingAndComments;
