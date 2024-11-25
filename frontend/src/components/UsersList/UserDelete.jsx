import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import DeleteIcon from '@mui/icons-material/Delete';

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
      <button
        onClick={deleteUser}
        disabled={loading}
        className="w-full bg-gray-600 text-gray-800 p-2 rounded-lg opacity-0 hover:bg-red-600 transition duration-300"
      >
        <DeleteIcon />
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};
