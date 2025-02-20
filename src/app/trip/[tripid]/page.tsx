import Activity from "@/components/activity";
import Days from "@/components/days";
import Map from "@/components/trip/map";
const Page = () => {
  return (
    <div className="min-h-screen bg-trip-navy flex items-center justify-center p-4">
      <Days />
      <Map />
    </div>
  );
};

export default Page;
