"use client";
import { X, Clock, MapPin, DollarSign } from "lucide-react";

interface ActivityProps {
  activityKey: number;
  dayKey: number;
  title: string;
  time: string;
  location: string;
  cost: number;
  handleDelete: (dayKey: number, activityKey: number) => void;
}

const Activity = ({
  dayKey,
  activityKey,
  title,
  time,
  location,
  cost,
  handleDelete,
}: ActivityProps) => {
  return (
    <div className="group relative p-4 flex flex-col gap-2 text-white w-full">
      <div className="flex flex-row justify-between">
        <div className="text-2xl font-bold">{title}</div>
        <X
          size={20}
          className="cursor-pointer text-white hover:text-white/20"
          onClick={() => {
            console.log("Daykey", dayKey);
            console.log("Activity Key", activityKey);
            handleDelete(dayKey, activityKey);
          }}
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
