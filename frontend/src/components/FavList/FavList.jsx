import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function FavList() {
  const [user] = useUser(); 
  const navigate = useNavigate();
  const [favoritos, setFavoritos] = useState([]); 
  const [error, setError] = useState(null);
  /* const apiUrl = import.meta.env.VITE_API_URL; */ // PREGUNTAR A SAMU

  useEffect(() => {
    if (!user?.id) {
      navigate("/login"); 
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch( `http://localhost:3001/users/${user.id}/favoritos`, {
          headers: {
            Authorization: user.token, 
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los datos de favoritos");
        }

        const data = await response.json();
        setFavoritos(data?.data || []); 
      } catch (err) {
        console.error("Error al obtener favoritos:", err);
        setError("No se pudieron cargar tus favoritos.");
      }
    };

    fetchData();
  }, [user?.id, user?.token, navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!favoritos.length) {
    return <div>No tienes guardado ningún vuelo.</div>;
  }

  return (
    <div>
      <h1>Lista de Favoritos</h1>
      <ul>
        {favoritos.map((favorito) => (
          <li key={favorito.id}>
            <h3>{favorito.origin} → {favorito.destination}</h3>
            <p>Fecha de salida: {new Date(favorito.departureDate).toLocaleDateString()}</p>
            <p>Aerolínea: {favorito.aeroline}</p>
            <p>Precio: {favorito.price} €</p>
            <p>Nota: {favorito.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavList;