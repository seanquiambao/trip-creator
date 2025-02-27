import { X } from "lucide-react";
import Activity from "./activity";
import { Day } from "@/types/trip";
import { useEffect } from "react";
import { Activity as ActivityType } from "@/types/trip";

type props = {
  days: Day[];
  setDays: (value: Day[]) => void;
};
const Days = ({ days, setDays }: props) => {
  const convertTo24HourFormat = (time: string) => {
    const [hour, period] = time.split(" ");
    let h = Number(hour);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0; // Handle 12 AM case
    return h * 60; // Convert to minutes for easy comparison
  };
  const sortActivitiesByTime = (activities: ActivityType[]) => {
    return activities.sort((a, b) => {
      const timeA = convertTo24HourFormat(a.time);
      const timeB = convertTo24HourFormat(b.time);
      console.log(timeA, timeB);
      return timeA - timeB;
    });
  };
  useEffect(() => {
    const sortedDays = days.map((day) => ({
      ...day,
      activities: sortActivitiesByTime([...day.activities]),
    }));
    setDays(sortedDays);
  }, [setDays]);

  const handleDelete = (dayKey: number, activityKey: number): void => {
    const updatedDays = [...days];
    const dayIndex = updatedDays.findIndex((day) => day.day === dayKey) + 1;
    console.log("dayIndex: ", dayIndex, "Daykey: ", dayKey);
    if (dayIndex == dayKey) {
      updatedDays[dayIndex].activities = updatedDays[
        dayIndex
      ].activities.filter((_, index) => index !== activityKey);
      setDays(updatedDays);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {days.map((day, index) => (
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
                activityKey={idx}
                title={activity.title}
                time={activity.time}
                location={activity.location}
                cost={activity.cost}
                dayKey={index}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Days;

//
/*

{
daykey: 2,
activitykey: 3
}
*/
