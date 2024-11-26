function DeleteFavoriteButton({ flightId, user, onRemove }) {
    const handleDelete = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/flights/favoritos/${flightId}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: user.token, // Incluye el token del usuario
            },
          }
        );
  
        if (!response.ok) {
          throw new Error('Error al eliminar el vuelo de favoritos');
        }
  
        // Llama a la función pasada como prop para actualizar la lista en el componente padre
        onRemove(flightId);
      } catch (error) {
        console.error('Error al eliminar el vuelo de favoritos:', error);
        alert('No se pudo eliminar el vuelo de favoritos. Inténtalo de nuevo.');
      }
    };
  
    return (
      <button
        className="inline-flex items-center px-3 py-2 text-sm font-medium"
        onClick={handleDelete}
      >
        <svg
          className="w-6 h-6 text-gray-700 dark:text-gray-200 hover:text-orange-500 transition duration-150 focus:text-red-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
          />
        </svg>

      </button>
    );
  }
  
  export default DeleteFavoriteButton;
  