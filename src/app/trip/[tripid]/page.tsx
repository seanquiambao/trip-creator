import TripEditor from "@/components/trip/trip-editor";

type props = {
  params: Promise<{ tripid: string }>;
};
const Page = async ({ params }: props) => {
  const { tripid } = await params;
  return (
    <div className="bg-trip-navy/90 flex flex-row items-start justify-between w-full h-full">
      <TripEditor tripid={tripid} />
    </div>
  );
};

export default Page;
