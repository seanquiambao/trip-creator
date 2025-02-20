import { X } from "lucide-react";
import Activity from "./activity";

// Sample mock data for days and activities
const mockDays = [
  {
    date: "11.12.2025",
    day: "Friday",
    activities: [
      {
        title: "Atlantic Beach Newport Hotel",
        time: "5 PM",
        location: "10900 Albany St.",
        cost: "$100",
      },
      {
        title: "Ono Hawaiian BBQ",
        time: "8 PM",
        location: "1000 Main St.",
        cost: "$100",
      },
    ],
  },
];

const Days = () => {
  return (
    <div className="p-4 flex flex-row gap-4">
      {mockDays.map((day, index) => (
        <div
          key={index}
          className="flex flex-row bg-trip-navy p-4 text-white mb-4 w-full"
        >
          {/* Left Panel: Date and Day */}
          <div className="flex flex-col items-center justify-center bg-trip-navy p-4 w-1/3">
            <div className="flex items-center gap-6 pl-4">
              <X
                size={28}
                className="cursor-pointer text-white hover:text-white/50"
              />
              <h2 className="text-5xl font-bold">
                {day.day} <br /> {day.date}
              </h2>
            </div>
          </div>
          {/* Right Panel: Activities */}
          <div className="flex flex-col gap-4 p-4 w-2/3">
            <hr className="border-white/20 mb-2" />
            {day.activities.map((activity, idx) => (
              <Activity
                key={idx}
                title={activity.title}
                time={activity.time}
                location={activity.location}
                cost={activity.cost}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Days;
