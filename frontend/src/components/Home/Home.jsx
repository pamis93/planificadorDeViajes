import FlightSearch from '../FlightSearch/FlightSearch';
import TravelCarousel from './TravelCarousel';
import RatingsCarousel from './RatingsCarousel';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#9AA5BC] text-white">
      <FlightSearch className="w-full" />
      <TravelCarousel />
      <RatingsCarousel />
    </div>
  );
}
