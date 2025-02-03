import TripCard from "@/components/trip";
import { TRIPS } from "@/data/trips";

const Page = () => {
  return (
    <div className="w-full grid grid-cols-3 gap-2">
      {TRIPS.map((trip, index) => (
        <TripCard
          key={index}
          id={trip.id}
          title={trip.title}
          date={trip.date}
          duration={trip.duration}
        />
      ))}
    </div>
  );
};

export default Page;
