import React from 'react';

const CommentList = ({ comment }) => {
  console.log(comment);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          rating > index
            ? 'text-yellow-400 scale-100'
            : 'text-gray-400 hover:text-yellow-400'
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.433-.767l-1.302-5.006 3.91-3.505a1.53 1.53 0 0 0 .353-1.538z" />
      </svg>
    ));
  };

  return (
    <div className="mt-8">
      <div className="mb-4 p-4 bg-white border rounded shadow w-full max-w-500 mx-auto flex justify-between items-center bg-zinc-200">
        <div className="flex flex-col mr-4">
          <p>
            <strong>Usuario: </strong> {comment.username}
          </p>
          <div className="flex items-center">
            <strong className="mr-2">Puntuación:</strong>
            <div className="flex">{renderStars(comment.rating)}</div>
          </div>
          <p>
            <strong>Comentario: </strong> {comment.comment}
          </p>
          <p>
            <strong>Fecha: </strong>
            {new Date(comment.created_at).toLocaleString()}
          </p>
        </div>
        <div className="flex-shrink-0">
          <img
            src={comment.avatar}
            alt={`${comment.username}'s avatar`}
            className="w-20 h-20 m-5 rounded-full border-4 border-white shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default CommentList;
