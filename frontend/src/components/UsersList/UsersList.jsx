import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { UsersPanel } from "./UsersPanel";
import logoUsers from "../../assets/logoUsers.png";
import './UsersList.css'
export const UsersList = () => {
  const [user] = useUser();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getList = async () => {
      try {
        //console.log('user:', user);
        
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
  
    getList();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div id="panel">
      <article>
      <img id="mdi_users" src={logoUsers} alt="icono de personas" />
      <h2>Gestion de usuarios</h2>
      </article>
      <UsersPanel userList={userList}/>
    </div>
  );
};
