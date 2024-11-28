import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const carouselData = [
  { image: "/paris.jpg", title: "PARIS", description: "ida y vuelta desde 180€", alt: "Paris" },
  { image: "/londres.jpg", title: "LONDRES", description: "ida y vuelta desde 120€", alt: "Londres" },
  { image: "/lisboa.jpg", title: "LISBOA", description: "ida y vuelta desde 90€", alt: "Lisboa" },
  { image: "/roma.jpg", title: "ROMA", description: "ida y vuelta desde 125€", alt: "Roma" },
];

const TravelCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Índice del primer elemento visible

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    // Si estamos en el penúltimo índice, volvemos al inicio
    setCurrentIndex((prevIndex) => (prevIndex + 2) % carouselData.length);
  };

  const prevSlide = () => {
    // Si estamos en el inicio, volvemos al penúltimo conjunto
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? (carouselData.length - 2 + carouselData.length) % carouselData.length : prevIndex - 2
    );
  };

  return (
    <>
      <div className="mb-6 items-center bg-[#686E9E] w-full">
        <h1 className="text-4xl font-bold text-white mb-2">
          EMPIEZA A PLANEAR TUS PROXIMAS AVENTURAS
        </h1>
        <p className="text-xl text-gray-100 mb-4 ml-10">
          conserva tus destinos preferidos en un solo lugar
        </p>
        <Link
          to="/search"
          className="text-blue-100 hover:underline hover:text-blue-800 transition bg-[#ff5a1f] w-full"
        >
          prueba buscar un vuelo y guardalo en tus favoritos &gt;&gt;&gt;
        </Link>
      </div>

      <div className="relative w-[700px] mt-8 mb-10">
        <div className="relative h-[620px] w-[900px] flex overflow-hidden space-x-5">
          {/* Renderizar dos imágenes */}
          {[0, 1].map((offset) => {
            const index = (currentIndex + offset) % carouselData.length; // Cálculo para manejar el ciclo infinito
            const slide = carouselData[index];
            return (
              <div key={index} className="w-1/2 h-full relative">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="rounded-lg w-full h-full object-cover"
                />
                {/* Texto superpuesto */}
                <div className="absolute bottom-4 left-4 bg-[#686E9E]/80 text-white px-4 py-2 rounded-lg shadow-lg">
                  <p className="font-bold">{slide.title}</p>
                  <p>{slide.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Flechas de navegación */}
        <button
          className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/75 transition"
          onClick={prevSlide}
        >
          &#10094;
        </button>
        <button
          className="absolute -right-60 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/75 transition"
          onClick={nextSlide}
        >
          &#10095;
        </button>

        {/* Indicadores de puntos */}
        <div className="absolute -bottom-5 left-[190px] right-0 flex justify-center space-x-2">
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
