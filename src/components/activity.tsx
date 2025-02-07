import { X, Clock, MapPin, DollarSign } from "lucide-react";

const Activity = () => {
  return (
    <div className="group relative p-4 rounded-lg shadow-lg flex flex-col gap-2 text-white">
      {/* Title */}
      <h2 className="text-lg font-bold">Ono Hawaiian BBQ</h2>

      {/* Details */}
      <div className="flex items-center gap-2 text-gray-500">
        <Clock size={16} /> <span>8 PM</span>
      </div>
      <div className="flex items-center gap-2 text-gray-500">
        <MapPin size={16} /> <span>1000 Main St.</span>
      </div>
      <div className="flex items-center gap-2 text-gray-500">
        <DollarSign size={16} /> <span>$100</span>
      </div>

      {/* Hover Delete Icon */}
      <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <X size={20} className="text-gray-500 hover:text-red-500" />
      </button>
    </div>
  );
};

export default Activity;
