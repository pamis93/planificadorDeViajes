import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TravelCarousel = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselData = [
    {
      image: "/paris.jpg",
      title: t("carousel.paris.title"),
      description: t("carousel.paris.description"),
      alt: t("carousel.paris.alt"),
    },
    {
      image: "/londres.jpg",
      title: t("carousel.london.title"),
      description: t("carousel.london.description"),
      alt: t("carousel.london.alt"),
    },
    {
      image: "/lisboa.jpg",
      title: t("carousel.lisbon.title"),
      description: t("carousel.lisbon.description"),
      alt: t("carousel.lisbon.alt"),
    },
    {
      image: "/roma.jpg",
      title: t("carousel.rome.title"),
      description: t("carousel.rome.description"),
      alt: t("carousel.rome.alt"),
    },
  ];

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
          {t("carousel.header.title")}
        </h1>
        <p className="text-base sm:text-xl text-gray-100 mb-4 text-center">
          {t("carousel.header.subtitle")}
        </p>
        <div className="flex justify-center">
          <Link
            to="/search"
            className="text-white mb-6 hover:underline hover:text-blue-800 transition bg-[#ff5a1f] px-4 py-2 rounded-lg"
          >
            {t("carousel.header.cta")}
          </Link>
        </div>
      </div>

      {/* Carrusel */}
      <div className="relative w-full max-w-4xl mx-auto mt-8 mb-10 px-4">
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
