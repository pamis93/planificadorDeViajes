import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const carouselData = [
  { image: "/paris.jpg", title: "PARIS", description: "ida y vuelta desde 180€", alt: "Paris" },
  { image: "/londres.jpg", title: "LONDRES", description: "ida y vuelta desde 120€", alt: "Londres" },
  { image: "/lisboa.jpg", title: "LISBOA", description: "ida y vuelta desde 90€", alt: "Lisboa" },
  { image: "/roma.jpg", title: "ROMA", description: "ida y vuelta desde 125€", alt: "Roma" },
];

const TravelCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      {/* Cabecera */}
      <div className="mb-6 items-center bg-[#686E9E] w-full px-4 sm:px-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2 mt-6 text-center">
          EMPIEZA A PLANEAR TUS PROXIMAS AVENTURAS
        </h1>
        <p className="text-base sm:text-xl text-gray-100 mb-4 text-center">
          conserva tus destinos preferidos en un solo lugar
        </p>
        <div className="flex justify-center">
          <Link
            to="/search"
            className="text-white mb-6 hover:underline hover:text-blue-800 transition bg-[#ff5a1f] px-4 py-2 rounded-lg"
          >
            Prueba buscar un vuelo y guardalo en tus favoritos &gt;&gt;&gt;
          </Link>
        </div>
      </div>

      {/* Carrusel */}
      <div className="relative w-full max-w-4xl mx-auto mt-8 mb-10 px-4">
        {/* Contenedor del carrusel */}
        <div className="relative flex h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
          {carouselData.map((slide, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-transform duration-500 ${
                index === currentIndex ? "translate-x-0" : index < currentIndex ? "-translate-x-full" : "translate-x-full"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-4 left-4 bg-[#686E9E]/80 text-white px-4 py-2 rounded-lg shadow-lg">
                <p className="font-bold">{slide.title}</p>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Botones de navegación */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/75 transition"
          onClick={prevSlide}
        >
          &#10094;
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/75 transition"
          onClick={nextSlide}
        >
          &#10095;
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
          {carouselData.map((_, index) => (
            <span
              key={index}
              className={`h-3 w-3 rounded-full cursor-pointer transition ${
                index === currentIndex ? "bg-gray-700" : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </>
  );
};

export default TravelCarousel;
