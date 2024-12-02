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
      setComments(responseData.data);
    } catch (err) {
      console.error('Error al obtener los comentarios:', err);
      setMessage({
        type: 'error',
        text: 'Hubo un problema al obtener los comentarios.',
      });
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const sortedComments = comments
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div className="container mx-auto pt-12 p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl text-center font-bold mb-4 pt-20">
        Déjanos tu opinión
      </h1>
      {message && (
        <div
          className={`text-center mb-4 p-2 rounded ${
            message.type === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-green-500 text-white'
          }`}
        >
          {message.text}
        </div>
      )}
      <RatingForm fetchComments={fetchComments} />{' '}
      {sortedComments && sortedComments.length > 0 ? (
        sortedComments.map((comment) => (
          <CommentList key={comment.id} comment={comment} />
        ))
      ) : (
        <p className="text-center">No hay comentarios disponibles</p>
      )}
    </div>
  );
};

export default RatingAndComments;
