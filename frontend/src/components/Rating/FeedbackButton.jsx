import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FeedbackButton = () => {
  const [averageRating, setAverageRating] = useState(null);
  const [numVotes, setNumVotes] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:3001/ratings');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAverageRating(parseFloat(data.averageRating));
        setNumVotes(data.numVotes);
      } catch (error) {
        console.error('Error al obtener las estadísticas:', error);
      }
    };
    fetchStats();
  }, []);
  return (
    <Link
      to="/ratings"
      className="fixed bottom-4 right-4 bg-orange-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-orange-700 transition-colors duration-300 flex items-center"
    >
      <div>
        <p>¡Danos tu opinión!</p>
        {averageRating !== null && numVotes !== null && (
          <p className="text-sm">
            Valoración media: ⭐{averageRating.toFixed(1)} ({numVotes} votos)
          </p>
        )}
      </div>
    </Link>
  );
};

export default FeedbackButton;
