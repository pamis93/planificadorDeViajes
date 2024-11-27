import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import LanguageNav from "./LanguageNav/LanguageNav";
import LogoutButton from "../Logout/LogoutButton";

import { Link } from "react-router-dom";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user] = useUser(); // Obtén el estado del usuario

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-custom-blue bg-opacity-75 text-white p-2 w-full h-20 fixed top-0 left-0 z-50 shadow-md">
      <div className="flex justify-between items-center w-full gap-8">
        <div className="flex justify-start items-center gap-1">
          <img className="w-10 rounded-xl" src="/witch2.svg" alt="ico" />
          <h1 className="text-3xl font-bold">
            <span className="text-orange-500">W</span>onder
            <span className="text-orange-500">F</span>ly
          </h1>

          {/* Opciones visibles según el estado del usuario */}
          <div className="flex justify-center gap-6 ml-10">
            <Link to="/search" className="text-white hover:text-orange-500 transition-colors">Vuelos</Link>
            {user?.token && ( // Solo mostrar estas opciones si el usuario tiene un token válido
              <>
                <a href="/about" className="text-white hover:text-orange-500 transition-colors">Favoritos</a>
                {user?.isAdmin ? (
  <a href="/admin/users" className="text-white hover:text-orange-500 transition-colors">Lista de Usuarios</a>
) : null}
              </>
            )}
          </div>
        </div>

        {/* Menú de idiomas y opciones de cuenta */}
        <nav className="flex justify-center items-center relative">
          <LanguageNav />

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex font-bold h-10 text-white hover:text-gray-300 hover: transition-colors bg-orange-500 rounded-xl p-2"
            >
              Mi cuenta
            </button>

            {/* Menú desplegable */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">

                {!user?.token ? ( // Mostrar estas opciones si el usuario NO está logueado
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
                ) : ( // Mostrar estas opciones si el usuario está logueado
                  <>
                    <Link
                      href="/edituser"
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

