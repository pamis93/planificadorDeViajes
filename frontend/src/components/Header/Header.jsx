import LanguageNav from "./LanguageNav/LanguageNav";



function Header() {
    return (
        <header className="bg-custom-blue text-white p-2 w-full h-20 position-absolute top-0 left-0 z-50 shadow-md mt-">
            <div className="flex justify-between items-center w-full gap-8">

                <div className="flex justify-start items-center gap-1">
                    <img className="w-10 rounded-xl" src="../../../public/witch2.svg" alt="ico" />
                    <h1 className="text-3xl font-bold">
                    <span className="text-orange-500">W</span>onder<span className="text-orange-500">F</span>ly
                    </h1>

                    <div className=" flex justify-center gap-6 ml-10">
                        <a href="/" className="text-white hover:text-orange-500 transition-colors">Vuelos</a>
                        <a href="/about" className="text-white hover:text-orange-500 transition-colors">Favoritos</a>
                    </div>
                
                </div>

                {/* menu de idiomas */}
                <nav className="flex justify-center items-center">
                        {<LanguageNav/>}
                        <a href="/contact" className="font-bold h-10 text-white hover:text-gray-300 transition-colors bg-orange-500 rounded-xl p-2">
                            Inicia sesión
                        </a>
                </nav>
            </div>
        </header>
    );
}

export default Header;

