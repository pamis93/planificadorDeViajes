import { useState } from 'react';
import { useUser } from '../../context/UserContext';
//import logoTrash from '../../assets/logoTrash.png';
// import DeleteIcon from '@mui/icons-material/Delete';
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
      <button id="trash" onClick={deleteUser} disabled={loading}>
        {/* <DeleteIcon /> */}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};
