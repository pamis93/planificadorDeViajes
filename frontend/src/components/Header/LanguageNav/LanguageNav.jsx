import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function LanguageNav() {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para controlar el menú desplegable
  

  // Depuración: Mostrar el idioma actual al montar el componente
  useEffect(() => {
    console.log("Idioma actual detectado por i18n:", i18n.language);
  }, [i18n.language]);

  // Manejar el cambio de idioma
  const handleLanguageChange = (language) => {
    console.log(`Intentando cambiar el idioma a: ${language}`);
    
    i18n.changeLanguage(language)
      .then(() => {
        console.log(`Idioma cambiado exitosamente a: ${i18n.language}`); // Verifica si i18n refleja el cambio
      })
      .catch((err) => {
        console.error("Error al cambiar el idioma:", err);
      });

    setSelectedLanguage(language); // Actualiza el estado local
    setIsDropdownOpen(false); // Cierra el menú desplegable
  };

  // Alternar visibilidad del menú desplegable
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="relative">
      <div className="flex items-center space-x-2">
        {/* Botón para abrir/cerrar el menú */}
        <button
          type="button"
          onClick={toggleDropdown} // Alterna el estado del menú
          className="flex items-center font-medium px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg hover:text-orange-500"
        >
          <img
            src={
              selectedLanguage === "es"
                ? "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg"
                : selectedLanguage === "de"
                ? "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg"
                : selectedLanguage === "fr"
                ? "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg"
                : "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
            }
            alt={t("language")}
            className="w-5 h-5 rounded-full"
          />
          <span className="ml-2 text-white">{selectedLanguage.toUpperCase()}</span>
        </button>

        {/* Menú desplegable */}
        {isDropdownOpen && (
          <div
            className="absolute top-full mt-2 right-0 z-50 w-40 bg-white rounded-lg shadow-md dark:bg-gray-700"
          >
            <ul className="py-2">
              {["es", "de", "fr", "en"].map((lang) => (
                <li key={lang}>
                  <button
                    onClick={() => handleLanguageChange(lang)} // Cambia el idioma y cierra el menú
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <img
                      src={
                        lang === "es"
                          ? "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg"
                          : lang === "de"
                          ? "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg"
                          : lang === "fr"
                          ? "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg"
                          : "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
                      }
                      alt={lang.toUpperCase()}
                      className="w-5 h-5 rounded-full mr-3"
                    />
                    {lang.toUpperCase()}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default LanguageNav;
