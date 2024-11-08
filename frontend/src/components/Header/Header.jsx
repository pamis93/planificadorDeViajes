import '../../output.css';
function Header() {
    return (
        <header className="bg-blue-600 text-white p-4 w-full">
            <div className="flex justify-between items-center max-w-7xl mx-auto gap-8">
                <h1 className="text-3xl font-bold">Mi Aplicación</h1>
                <nav>
                    <ul className="flex gap-6">
                        <li>
                            <a href="/" className="hover:text-gray-300">
                                Inicio
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-gray-300">
                                Acerca de
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-gray-300">
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
