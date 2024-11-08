import './Header.css'; // Importa el archivo CSS

function Header() {
    return (
        <header className="header">
            <div className="container">
                <h1 className="title">Mi Aplicación</h1>
                <nav>
                    <ul className="nav-list">
                        <li>
                            <a href="/" className="nav-link">Inicio</a>
                        </li>
                        <li>
                            <a href="/about" className="nav-link">Acerca de</a>
                        </li>
                        <li>
                            <a href="/contact" className="nav-link">Contacto</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
