import { X, Clock, MapPin, DollarSign } from "lucide-react";

const Activity = () => {
  return (
    <div className="group relative p-4 flex flex-col gap-2 text-white">
      {/* Title */}
      <h2 className="text-lg font-bold">Ono Hawaiian BBQ</h2>

      {/* Details */}
      <div className="flex items-center gap-2 text-black/20">
        <Clock size={16} /> <span>8 PM</span>
      </div>
      <div className="flex items-center gap-2 text-gray-500">
        <MapPin size={16} /> <span>1000 Main St.</span>
      </div>
      <div className="flex items-center gap-2 text-gray-500">
        <DollarSign size={16} /> <span>$100</span>
      </div>

      {/* Hover Delete Icon */}
      <X
        size={20}
        className="cursor-pointer text-white hover:text-white/20"
        onClick={() => console.log("Hello world")}
      />
    </div>
  );
};

export default Activity;
