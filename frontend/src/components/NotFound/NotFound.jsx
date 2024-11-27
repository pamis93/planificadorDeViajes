// import React from "react";
import { Link } from "react-router-dom";
import airplaneImage from "../../assets/airplane.png";

const NoFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#42486A] to-[#232946] text-white text-center">
      
      <div className="relative w-48 h-48 mb-8">
        <img
          src={airplaneImage} // Imagen importada desde src/assets
          alt="Avión perdido"
          className="animate-bounce"
        />
        
      </div>
     
      <h1 className="text-4xl font-bold mb-4">¡Ups! Vuelo perdido</h1>
      <p className="text-lg mb-6">
        No encontramos la página que buscabas. Parece que este destino no está
        en nuestro itinerario.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-[#F66136] text-white font-semibold rounded-md hover:bg-orange-600 transition"
      >
        Volver a la pista de aterrizaje
      </Link>
    </div>
  );
};

export default NoFound;
