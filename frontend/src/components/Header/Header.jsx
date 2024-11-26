import { useState, useEffect, useRef } from 'react';
import { useUser } from '../../context/UserContext';
import LanguageNav from './LanguageNav/LanguageNav';
import LogoutButton from '../Logout/LogoutButton';
import { Link } from 'react-router-dom';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user] = useUser(); // Obtén el estado del usuario
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Detecta clics fuera del menú desplegable
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    // Agrega el event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Limpia el event listener al desmontar el componente
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-custom-blue text-white p-2 w-full h-20 fixed top-0 left-0 z-50 shadow-md">
      <div className="flex justify-between items-center w-full gap-8">
        <div className="flex justify-start items-center gap-1">
          <img className="w-10 rounded-xl" src="/witch2.svg" alt="ico" />
          <h1 className="text-3xl font-bold">
            <span className="text-orange-500">W</span>onder
            <span className="text-orange-500">F</span>ly
          </h1>

          <div className="flex justify-center gap-6 ml-10">
            <Link
              to="/search"
              className="text-white hover:text-orange-500 transition-colors"
            >
              Vuelos
            </Link>
            {user && (
              <Link
                to={`/users/${user.id}/favoritos`} // Ruta dinámica
                className="text-white hover:text-orange-500 transition-colors"
              >
                Favoritos
              </Link>
            )}
          </div>
        </div>

        {/* Menú de idiomas y opciones de cuenta */}
        <nav className="flex justify-center items-center relative">
          <LanguageNav />

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex font-bold h-10 text-white hover:text-gray-300 transition-colors bg-orange-500 rounded-xl p-2"
            >
              Mi cuenta
            </button>

            {/* Menú desplegable */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={closeDropdown} // Cierra el menú al hacer clic
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={closeDropdown} // Cierra el menú al hacer clic
                    >
                      Registrarse
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/edit-user"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={closeDropdown} // Cierra el menú al hacer clic
                    >
                      Editar usuario
                    </Link>
                    <LogoutButton onClick={closeDropdown} /> {/* Cierra también aquí */}
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
