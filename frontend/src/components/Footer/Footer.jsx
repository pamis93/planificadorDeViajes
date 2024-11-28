function Footer() {
  return (
    <>
      <footer className="bg-custom-blue text-white text-sm sm:text-base py-4 sm:py-8 mt-6 sm:mt-0">
        <div className="container mx-auto px-4">
          {/* Parte superior del footer */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo o nombre del sitio */}
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold">WonderFly</h1>
            </div>

            {/* Enlaces de navegación */}
            <nav className="flex flex-wrap justify-center gap-4">
              <a
                href="#about"
                className="hover:text-orange-500 transition-colors"
              >
                Acerca de
              </a>
              <a
                href="#contact"
                className="hover:text-orange-500 transition-colors"
              >
                Contacto
              </a>
              <a
                href="#privacy"
                className="hover:text-orange-500 transition-colors"
              >
                Política de Privacidad
              </a>
              <a
                href="#terms"
                className="hover:text-orange-500 transition-colors"
              >
                Términos y Condiciones
              </a>
            </nav>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-[#a19f9f]"></div>

          {/* Redes sociales */}
          <div className="flex justify-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition-colors"
            >
              LinkedIn
            </a>
          </div>

          {/* Copyright */}
          <div className="mt-6 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} WonderFly. Todos los derechos
            reservados.
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
