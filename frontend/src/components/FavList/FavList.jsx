import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import DeleteFavoriteButton from './DeleteFavoriteButton/DeleteFavoriteButton';
import Head from './Head/Head';

function FavList() {
  const [user] = useUser();
  const navigate = useNavigate();
  const [favoritos, setFavoritos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/users/${user.id}/favoritos`,
          {
            headers: {
              Authorization: user.token,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Error al obtener los datos de favoritos');
        }

        const data = await response.json();
        setFavoritos(data?.data || []);
      } catch (err) {
        console.error('Error al obtener favoritos:', err);
        setError('No se pudieron cargar tus favoritos.');
      }
    };

    fetchData();
  }, [user?.id, user?.token, navigate]);

  const removeFavorite = (flightId) => {
    setFavoritos((prev) => prev.filter((fav) => fav.id !== flightId));
  };

  // Funciones de ordenación
  const handleSortByPrice = () => {
    const sorted = [...favoritos].sort((a, b) => a.price - b.price);
    setFavoritos(sorted);
  };

  const handleSortByCity = () => {
    const sorted = [...favoritos].sort((a, b) =>
      a.destination.localeCompare(b.destination)
    );
    setFavoritos(sorted);
  };

  const handleSortByDate = () => {
    const sorted = [...favoritos].sort(
      (a, b) => new Date(a.departureDate) - new Date(b.departureDate)
    );
    setFavoritos(sorted);
  };

  if (error) {
    return <div className="text-red-600 font-bold text-center">{error}</div>;
  }

  if (!favoritos.length) {
    return (
      <div className="text-gray-900 dark:text-gray-300 text-center">
        No tienes guardado ningún vuelo.
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col mt-20">
      
      <Head
        favoritos={favoritos}
        setFavoritos={setFavoritos}
        handleSortByPrice={handleSortByPrice}
        handleSortByCity={handleSortByCity}
        handleSortByDate={handleSortByDate}
      />

      {/* Lista de favoritos */}
      <ul className="flex flex-col items-center space-y-4 bg-[#9AA5BC] p-4">
        {favoritos.map((favorito) => (
          <li
            key={favorito.id}
            className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700 sm:max-w-3xl"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
              {/* Columna 1: Origen y Destino */}
              <div className="flex flex-col sm:col-span-4">
                <h5 className="mb-2 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {favorito.origin} → {favorito.destination}
                </h5>
                <p className="mb-3 text-gray-900 dark:text-gray-300">
                  Fecha de salida:{' '}
                  {new Date(favorito.departureDate).toLocaleDateString()}
                </p>
                <button
                  className="px-3 py-2 text-sm text-white bg-orange-500 rounded-lg hover:bg-orange-700"
                  onClick={() => navigate(`/flights/${favorito.id}`)}
                >
                  Ver detalle del vuelo
                </button>
              </div>

              {/* Columna 2: Nota */}
              <div className="bg-[#8c79aa] px-4 text-white sm:col-span-6">
                <p className="dark:text-gray-300">Nota: {favorito.note}</p>
              </div>

              {/* Columna 3: Precio y Eliminar */}
              <div className="flex flex-col items-end pl-4 sm:col-span-2">
                <p className="mb-3 text-orange-500">{favorito.price} €</p>
                <DeleteFavoriteButton
                  flightId={favorito.id}
                  user={user}
                  onRemove={removeFavorite}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavList;
