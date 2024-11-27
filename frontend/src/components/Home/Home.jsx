import FlightSearch from '../FlightSearch/FlightSearch'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-screen bg-cover bg-center bg-[#9AA5BC] text-white">
      <FlightSearch className="w-full" />
      <div className="max-w-4xl mx-auto mt-8 bg-[#686e9e] rounded-lg w-full">
        <div className="relative p-8">
          <h1 className=" text-3xl font-bold mb-4 ">EMPIEZA A PLANEAR TUS PRÓXIMAS AVENTURAS</h1>
          <p className="mb-8">Conserva Tus Destinos Preferidos En Un Solo Lugar, Incluso Si Aún No Decides Reservar</p>
          <div className="grid grid-cols-2 gap-8">
            <div className="relative">
              <img src="../../../public/paris.jpg" alt="Paris" className="rounded-lg mb-4 w-[350px] h-[400px]" />
              <div className="absolute bottom-4 right-4 bg-[#9AA5BC] text-white px-4 py-2 rounded-md">
                <p>PARIS</p>
                <p>ida y vuelta desde 180€</p>
              </div>
            </div>
            <div className="relative">
              <img src="../../../public/londres.jpg" alt="Londres" className="rounded-lg mb-4 w-[350px] h-[400px]" />
              <div className="absolute bottom-4 right-4 bg-[#9AA5BC] text-white px-4 py-2 rounded-md">
                <p>LONDRES</p>
                <p>ida y vuelta desde 120€</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}