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
/*className={`status ${isActive ? 'Activo' : 'Inactivo'}`}*/
  return (
    <div className='p-4'>
      <button
      className={`w-24 h-6 p-2 flex items-center justify-center gap-2 rounded-full text-white font-manrope text-xs font-medium leading-5 text-center shadow-lg ${
        isActive ? 'bg-[#0df20d]' : 'bg-[#757575]'
      }`}
        
        onClick={changeStatus}
      >
        {loading ? 'Actualizando...' : isActive ? 'Activo' : 'Inactivo'}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};
