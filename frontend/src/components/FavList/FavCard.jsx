export const FavCard = ({favorito}) => {

  return (
    <div  className='shadow-md rounded-lg py-2 px-2 text-left text-s text-black bg-[#d1d8e8]'>
      <p>Origen: {favorito.origin}</p>
       <p>Destino: {favorito.destination}</p>
      <p>Fecha de Salida: {new Date(favorito.departureDate).toLocaleDateString()}</p>
       <p>Fecha de llegada: {new Date(favorito.arrivalDate).toLocaleDateString()}</p>
      <p>Aerolinea: {favorito.aeroline}</p>
      <p>Precio: {favorito.price} €</p>
      <p>Duracion: {favorito.duration}</p>
      <p>Nota: {favorito.note}</p>
    </div>
  )
}
