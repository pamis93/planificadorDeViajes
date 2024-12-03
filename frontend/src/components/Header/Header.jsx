import { useState, useEffect, useRef } from "react";
import { useUser } from "../../context/UserContext";
import LanguageNav from "./LanguageNav/LanguageNav";
import LogoutButton from "../Logout/LogoutButton";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user] = useUser();
  const dropdownRef = useRef(null);

  // Hook de traducción
  const { t } = useTranslation();

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
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Limpia el event listener al desmontar el componente
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-custom-blue text-white px-3 pt-5 w-full h-20 fixed top-0 left-0 z-50 shadow-md">
      <div className="flex justify-between sm:items-center sm:w-full sm:gap-8">
        <div className="flex justify-start items-center sm:gap-1">
          <Link to="/" className="flex items-center gap-1">
            <img className="w-10 rounded-xl" src="/witch2.svg" alt="ico" />
            <h1 className="hidden sm:block text-3xl font-bold">
              <span className="text-orange-500">W</span>onder
              <span className="text-orange-500">F</span>ly
            </h1>
          </Link>

          <div className="flex justify-center items-center text-center gap-2 sm:gap-6 ml-3 sm:ml-20">
            <Link
              to="/search"
              className="text-white hover:text-orange-500 transition-colors "
            >
              {t("flights")} {/* Traducción para "Vuelos" */}
            </Link>
            {user && (
              <>
                <Link
                  to={`/users/${user.id}/favoritos`} // Ruta dinámica
                  className="text-white hover:text-orange-500 transition-colors"
                >
                  {t("favorites")} {/* Traducción para "Favoritos" */}
                </Link>

                {user?.isAdmin ? (
                  <Link
                    to={`/admin/users`}
                    className="text-white hover:text-orange-500 transition-colors"
                  >
                    {t("userList")} {/* Traducción para "Lista de Usuarios" */}
                  </Link>
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
              <span className="hidden sm:block">
                {t("myAccount")} {/* Traducción para "Mi cuenta" */}
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#5f6cb4] text-white rounded-lg shadow-lg">
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 w-full hover:bg-[#485592]"
                      onClick={closeDropdown}
                    >
                      {t("login")} {/* Traducción para "Iniciar sesión" */}
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 w-full hover:bg-[#485592]"
                      onClick={closeDropdown}
                    >
                      {t("register")} {/* Traducción para "Registrarse" */}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/edituser"
                      className="block px-4 py-2 hover:rounded-lg hover:bg-[#485592]"
                      onClick={closeDropdown}
                    >
                      {t("editUser")} {/* Traducción para "Editar usuario" */}
                    </Link>
                    <Link to="/">
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
