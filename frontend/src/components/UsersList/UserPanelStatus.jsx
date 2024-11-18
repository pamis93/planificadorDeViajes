import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';

export const UserPanelStatus = ({ userId, active, updateUserStatus }) => {
  const [user] = useUser();
  const [isActive, setIsActive] = useState(active);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => { 
  }, [active]);

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
        //body: JSON.stringify({ active: !isActive }),
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
        className={`status ${isActive ? 'Activo' : 'Inactivo'}`}
        onClick={changeStatus}
      >
        {loading ? 'Actualizando...' : isActive ? 'Activo' : 'Inactivo'}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};
