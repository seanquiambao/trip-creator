"use client";
import { X, Clock, MapPin, DollarSign } from "lucide-react";

const Activity = () => {
  return (
    <div className="group relative p-4 flex flex-col gap-2 text-white w-full">
      <div className="flex flex-row justify-between">
        <div className="text-lg font-bold">Ono Hawaiian BBQ</div>
        <X
          size={20}
          className="cursor-pointer text-white hover:text-white/20"
          onClick={() => console.log("Hello world")}
        />
      </div>

      <div className="flex items-center gap-2 text-white/20">
        <Clock size={16} /> <span>8 PM</span>
      </div>
      <div className="flex items-center gap-2 text-white/20">
        <MapPin size={16} /> <span>1000 Main St.</span>
      </div>
      <div className="flex items-center gap-2 text-white/20">
        <DollarSign size={16} /> <span>$100</span>
      </div>
    </div>
  );
};

export default Activity;
