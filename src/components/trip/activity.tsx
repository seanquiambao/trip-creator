"use client";
import { X, Clock, MapPin, DollarSign } from "lucide-react";

interface ActivityProps {
  title: string;
  time: string;
  location: string;
  cost: number;
}

const Activity = ({ title, time, location, cost }: ActivityProps) => {
  return (
    <div className="group relative p-4 flex flex-col gap-2 text-white w-full">
      <div className="flex flex-row justify-between">
        <div className="text-2xl font-bold">{title}</div>
        <X
          size={20}
          className="cursor-pointer text-white hover:text-white/20"
          onClick={() => console.log("Hello world")}
        />
      </div>

      <div className="flex items-center gap-2 text-white/20 text-lg">
        <Clock size={20} /> <span>{time}</span>
      </div>
      <div className="flex items-center gap-2 text-white/20 text-lg">
        <MapPin size={20} /> <span>{location}</span>
      </div>
      <div className="flex items-center gap-2 text-white/20 text-lg">
        <DollarSign size={20} /> <span>{cost}</span>
      </div>
    </div>
  );
};

export default Activity;
