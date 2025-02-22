import Days from "@/components/days";
import Map from "@/components/trip/map";
import TripDetail from "@/components/trip/trip-detail";
const Page = () => {
  return (
    <div className="bg-trip-navy/90 flex flex-row items-center justify-between w-full h-fit">
      <div className="self-start p-6 w-2/3 overflow-y-auto max-h-screen">
        <TripDetail title="San Diego Trip 2025" date={new Date()} />
        <Days />
      </div>
      <Map />
    </div>
  );
};

export default Page;
