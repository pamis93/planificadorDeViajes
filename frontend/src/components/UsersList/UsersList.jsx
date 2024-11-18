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
    useEffect(() => {
      if (user && user.token) {
      getList();
      } else {
      setLoading(false);
      setError("Usuario no autorizado");
      }
     }, [user]);

     useEffect(() => {
      if (userList.length > 0) {
        console.log("Updated user list:", userList);
      }
    }, [userList]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div id="panel">
      <article>
      <img id="mdi_users" src={logoUsers} alt="icono de personas" />
      <h2 className="gestion">Gestion de usuarios</h2>
      </article>
      <UsersPanel userList={userList} setUserList={setUserList} />
    </div>
  );
};
