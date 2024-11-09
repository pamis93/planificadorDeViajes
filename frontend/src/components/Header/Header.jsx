
import './Header.css'; // Importa el archivo CSS

function Header() {
    return (
        <header className="bg-blue-600 text-white p-4 w-full fixed top-0 left-0 z-50 shadow-md">
            <div className="flex justify-between items-center max-w-7xl mx-auto gap-8">
                <h1 className="text-3xl font-bold">Mi Aplicación</h1>
                <nav>
                    <ul className="flex gap-6">
                        <li>
                            <a href="/" className="text-white hover:text-gray-300 transition-colors">
                                Inicio
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="text-white hover:text-gray-300 transition-colors">
                                Acerca de
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="text-white hover:text-gray-300 transition-colors">
                                Contacto
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;

