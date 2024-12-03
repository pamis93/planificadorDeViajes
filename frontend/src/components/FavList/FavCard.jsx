import { useTranslation } from "react-i18next";

export const FavCard = ({ favorito }) => {
  const { t } = useTranslation();

  return (
    <div className='shadow-md rounded-lg py-2 px-2 text-left text-s text-black bg-[#d1d8e8]'>
      <p>{t('favCardOrigin')}: {favorito.origin}</p>
      <p>{t('favCardDestination')}: {favorito.destination}</p>
      <p>{t('favCardDepartureDate')}: {new Date(favorito.departureDate).toLocaleDateString()}</p>
      <p>{t('favCardArrivalDate')}: {new Date(favorito.arrivalDate).toLocaleDateString()}</p>
      <p>{t('favCardAirline')}: {favorito.aeroline}</p>
      <p>{t('favCardPrice')}: {favorito.price} €</p>
      <p>{t('favCardDuration')}: {favorito.duration}</p>
    </div>
  );
};
