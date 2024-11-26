import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import {TrashIcon} from '@heroicons/react/16/solid'
export const UserDelete = ({ userId, setUserList }) => {
  const [user] = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteUser = async () => {
    if (!window.confirm('El Usuario se eliminará, desea continuar?')) {
      return;  
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3001/admin/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${user.token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setUserList(prevList => prevList.filter(user => user.id !== userId));

    } catch (error) {
      console.error('Error al eliminar el usuario', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button id="trash" className=' w-6 h-6 p-1 mt-2.5 m-0 gap-0 bg-[#686e9e] text-[#252a31] rounded-full' onClick={deleteUser} disabled={loading}> 
        <TrashIcon className='w-5 h-5'/>
      </button>
      {error && <div className="text-red-700 text-sm mt-2">{error}</div>}
    </div>
  );
};
