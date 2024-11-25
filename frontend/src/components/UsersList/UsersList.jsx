import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { UsersPanel } from './UsersPanel';
import logoUsers from '../../assets/logoUsers.png';

export const UsersList = () => {
  const [user] = useUser();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getList = async () => {
    try {
      const res = await fetch("http://localhost:3001/admin/users", {
        method: "GET",
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `${user.token}` 
        }, 
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const content = await res.json();
      setUserList(content.data.users || []); 
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.token) {
      getList();
    } else {
      setLoading(false);
      setError("Usuario no autorizado");
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="panel" className="p-6 bg-indigo-600 rounded-lg max-w-xl mx-auto text-center">
      <article className="flex items-center gap-3">
        <img id="mdi_users" src={logoUsers} alt="icono de personas" className="w-10 h-10" />
        <h2 className="gestion text-white text-xl font-bold">Gestión de usuarios</h2>
      </article>
      <UsersPanel userList={userList} setUserList={setUserList} />
    </div>
  );
};
