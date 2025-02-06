import TripCard from "@/components/trip/trip-card";
import AddCard from "@/components/trip/add-card";
import { TRIPS } from "@/data/trips";

const Page = () => {
  return (
    <div className="flex flex-col w-full p-6 gap-y-2">
      <div className="text-4xl font-bold">My Trips</div>
      <div className="grid grid-cols-3 gap-2">
        {TRIPS.map((trip, index) => (
          <TripCard
            key={index}
            id={trip.id}
            title={trip.title}
            date={trip.date}
            duration={trip.duration}
          />
        ))}
        <AddCard />
      </div>
    </div>
  );
};

export default Page;
