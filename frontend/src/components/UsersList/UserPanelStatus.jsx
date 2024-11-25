import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';

export const UserPanelStatus = ({ userId, active, updateUserStatus }) => {
  const [user] = useUser();
  const [isActive, setIsActive] = useState(active);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {}, [active]);

  const changeStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3001/admin/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user.token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const result = await res.json();
      setIsActive(result.data.response.enable);
      updateUserStatus(userId, result.data.enable);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={changeStatus}
        className={`status w-20 h-10 p-3 rounded-full text-white text-xs font-medium ${isActive ? 'bg-green-500' : 'bg-gray-600'} transition duration-300`}
      >
        {loading ? 'Actualizando...' : isActive ? 'Activo' : 'Inactivo'}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};
