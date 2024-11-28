import { useState, useEffect, useRef } from 'react';
import { useUser } from '../../context/UserContext';
import LanguageNav from "./LanguageNav/LanguageNav";
import LogoutButton from "../Logout/LogoutButton";
import { Link } from "react-router-dom";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user] = useUser(); 
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
      <div className="flex justify-between sm:items-center sm:w-full sm:gap-8">
        <div className="flex justify-start items-center sm:gap-1">
        <Link to="/" className="flex items-center gap-1">
          <img className="w-10 rounded-xl" src="/witch2.svg" alt="ico" />
          <h1 className="hidden sm:block text-3xl font-bold">
            <span className="text-orange-500">W</span>onder
            <span className="text-orange-500">F</span>ly
          </h1>
          </Link>
          <div className="flex justify-center gap-6 ml-10">
            <Link
              to="/search"
              className="text-white hover:text-orange-500 transition-colors"
            >
              Vuelos
            </Link>
            {user && (
              <>
              <Link
                to={`/users/${user.id}/favoritos`} // Ruta dinámica
                className="text-white hover:text-orange-500 transition-colors"
              >
                Favoritos
              </Link>
              {user?.isAdmin ? (
                <a href="/admin/users" className="text-white hover:text-orange-500 transition-colors">Lista de Usuarios</a>
              ) : null}
              </>
            )}
          </div>
        </div>

        <nav className="flex justify-center items-center relative">
          <LanguageNav />

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center font-bold h-10 text-sm text-white hover:text-gray-300 transition-colors bg-orange-500 rounded-xl p-2"
            >
              {/* Ícono visible solo en pantallas pequeñas */}
              <svg
                className="w-6 h-6 sm:hidden text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                  clipRule="evenodd"
                />
              </svg>

              {/* Texto visible solo en pantallas más grandes */}
              <span className="hidden sm:block">Mi cuenta</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0  mt-2 w-40 bg-[#5f6cb4] text-white  rounded-lg shadow-lg">
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 w-full hover:bg-[#485592]"
                      onClick={closeDropdown} // Cierra el menú al hacer clic
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 w-full hover:bg-[#485592]"
                      onClick={closeDropdown} // Cierra el menú al hacer clic
                    >
                      Registrarse
                    </Link>
                  </>
                ) : ( 
                  <>
                    <Link
                      to="/edituser"
                      className="block px-4 py-2 hover:rounded-lg hover:bg-[#485592]"
                      onClick={closeDropdown} // Cierra el menú al hacer clic
                    >
                      Editar usuario
                    </Link>
                    <Link
                      to="/"
                    >
                      <LogoutButton onClick={closeDropdown} />
                    </Link>
                    
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

