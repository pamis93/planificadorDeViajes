import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LanguageNav() {
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const navigate = useNavigate();

    // Manejar el cambio de idioma
    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        // Aquí puedes agregar la lógica para cambiar el idioma de la app
        // Por ejemplo, utilizando i18n o un sistema de traducción
        navigate("/"); // Redirigir a la página de inicio o donde desees
    };

    return (
        <>
            <nav className="border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
                        <button
                            type="button"
                            data-dropdown-toggle="language-dropdown-menu"
                            className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            {/* Icono de la bandera actual */}
                            {selectedLanguage === "es" && (
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg"
                                    alt="Español"
                                    className="w-5 h-5 rounded-full"
                                />
                            )}
                            {selectedLanguage === "de" && (
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg"
                                    alt="Alemán"
                                    className="w-5 h-5 rounded-full"
                                />
                            )}
                            {selectedLanguage === "fr" && (
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg"
                                    alt="Francés"
                                    className="w-5 h-5 rounded-full"
                                />
                            )}
                            {selectedLanguage === "en" && (
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
                                    alt="Inglés"
                                    className="w-5 h-5 rounded-full"
                                />
                            )}
                            <span className="ml-2 text-white">
                                {selectedLanguage === "es"
                                    ? "ESP"
                                    : selectedLanguage === "de"
                                    ? "DE"
                                    : selectedLanguage === "fr"
                                    ? "FR"
                                    : "EN"}
                            </span>
                        </button>
                        {/* Dropdown para elegir el idioma */}
                        <div
                            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
                            id="language-dropdown-menu"
                        >
                            <ul className="py-2 font-medium" role="none">
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                        role="menuitem"
                                        onClick={() => handleLanguageChange("es")}
                                    >
                                        <div className="inline-flex items-center">
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg"
                                                alt="Español"
                                                className="w-5 h-5 rounded-full me-3"
                                            />
                                            ESP
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                        role="menuitem"
                                        onClick={() => handleLanguageChange("de")}
                                    >
                                        <div className="inline-flex items-center">
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg"
                                                alt="Alemán"
                                                className="w-5 h-5 rounded-full me-3"
                                            />
                                            DE
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                        role="menuitem"
                                        onClick={() => handleLanguageChange("fr")}
                                    >
                                        <div className="inline-flex items-center">
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg"
                                                alt="Francés"
                                                className="w-5 h-5 rounded-full me-3"
                                            />
                                            FR
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                        role="menuitem"
                                        onClick={() => handleLanguageChange("en")}
                                    >
                                        <div className="inline-flex items-center">
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
                                                alt="Inglés"
                                                className="w-5 h-5 rounded-full me-3"
                                            />
                                            EN
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default LanguageNav;
