import { X } from "lucide-react";
import Activity from "./activity";
import { Day } from "@/types/trip";

// Sample mock data for days and activities
const mockDays: Day[] = [
  {
    date: new Date(11, 11, 2025),
    day: 1,
    activities: [
      {
        title: "Atlantic Beach Newport Hotel",
        time: "5 PM",
        location: "10900 Albany St.",
        cost: 100,
      },
      {
        title: "Ono Hawaiian BBQ",
        time: "8 PM",
        location: "1000 Main St.",
        cost: 100,
      },
    ],
  },
  {
    date: new Date(11, 11, 2025),
    day: 1,
    activities: [
      {
        title: "Atlantic Beach Newport Hotel",
        time: "5 PM",
        location: "10900 Albany St.",
        cost: 100,
      },
      {
        title: "Ono Hawaiian BBQ",
        time: "8 PM",
        location: "1000 Main St.",
        cost: 100,
      },
    ],
  },
  {
    date: new Date(11, 11, 2025),
    day: 1,
    activities: [
      {
        title: "Atlantic Beach Newport Hotel",
        time: "5 PM",
        location: "10900 Albany St.",
        cost: 100,
      },
      {
        title: "Ono Hawaiian BBQ",
        time: "8 PM",
        location: "1000 Main St.",
        cost: 100,
      },
    ],
  },
];

const Days = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {mockDays.map((day, index) => (
        <div key={index} className="flex flex-row text-white  w-full">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-6">
              <X
                size={28}
                className="cursor-pointer text-white hover:text-white/50"
              />
              <div className="font-bold text-center">
                <div className="text-5xl">DAY</div>
                <div className="text-7xl">
                  {day.day.toString().padStart(2, "0")}
                </div>
                <div className="text-white/20 text-2xl pt-4">
                  {day.date.toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 w-full">
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
