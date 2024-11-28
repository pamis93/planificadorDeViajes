import React from 'react';

const CommentList = ({ comment }) => {
  return (
    <div className="mt-8">
      <div className="mb-4 p-4 bg-white border rounded shadow w-full max-w-lg mx-auto">
        <p>
          <strong>Puntuación:</strong> {comment.rating}
        </p>
        <p>
          <strong>Comentario:</strong> {comment.comment}
        </p>
        <p>
          <strong>Usuario:</strong> {comment.username}
        </p>
        <p>
          <strong>Fecha:</strong>
          {new Date(comment.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CommentList;
