import { useTranslation } from 'react-i18next';
import fondoFav from '../../../assets/fondoFav2.png';

function Head({
  handleSortByPrice,
  handleSortByCity,
  handleSortByDate,
}) {
  const { t } = useTranslation();

  return (
    <div className="relative w-full h-[300px] sm:h-[300px]">
      <img
        src={fondoFav}
        alt="Cabecera"
        className="w-full h-[200px] object-cover sm:h-full"
      />
      {/* Contenido de la cabecera */}
      <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-1 sm:grid-rows-2 px-4 items-center">
        {/* Columna izquierda: Títulos */}
        <div className="flex flex-col justify-center sm:col-span-1 bg-slate-400 bg-opacity-30 sm:w-[500px]">
          <h1 className="text-base sm:text-3xl font-bold text-white">
            {t('myFavoritesFlights')}
          </h1>
          <h3 className="text-xs sm:text-lg text-white mt-2">
            {t('manageYourDestinations')}
          </h3>
        </div>

        {/* Columna derecha: Botones de filtro */}
        <div className="flex pb-4 sm:flex-row flex-col items-center gap-2 sm:items-start sm:col-span-1 mt-4">
          <button
            onClick={handleSortByPrice}
            className="px-2 py-1 sm:px-4 sm:py-2 w-48 bg-white text-black rounded-lg hover:bg-orange-500 hover:text-white text-sm sm:text-base"
          >
            {t('sortByPrice')}
          </button>
          <button
            onClick={handleSortByCity}
            className="px-2 py-1 sm:px-4 sm:py-2 w-48 bg-white text-black rounded-lg hover:bg-orange-500 hover:text-white text-sm sm:text-base"
          >
            {t('sortByCity')}
          </button>
          <button
            onClick={handleSortByDate}
            className="px-2 py-1 sm:px-4 sm:py-2 w-48 bg-white text-black rounded-lg hover:bg-orange-500 hover:text-white text-sm sm:text-base"
          >
            {t('sortByDate')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Head;
