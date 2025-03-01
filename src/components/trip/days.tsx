import { X } from "lucide-react";
import Activity from "./activity";
import { Day } from "@/types/trip";
import { useEffect } from "react";
import { Activity as ActivityType } from "@/types/trip";

type Props = {
  days: Day[];
  setDays: (value: Day[]) => void;
};

const Days = ({ days, setDays }: Props) => {
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

  const handleRemoveDay = (indexToRemove: number) => {
    const filteredDays = days.filter((_, index) => index !== indexToRemove);

    const updatedDays = filteredDays.map((day, index) => ({
      ...day,
      day: index + 1,
      date:
        index < indexToRemove
          ? day.date
          : new Date(
              filteredDays[index - 1].date.getTime() + 24 * 60 * 60 * 1000
            ),
    }));

    setDays(updatedDays);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {days.map((day, index) => (
        <div key={index} className="flex flex-row text-white w-full">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-6">
              <X
                size={28}
                className="cursor-pointer text-white hover:text-white/50"
                onClick={() => handleRemoveDay(index)}
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
          <div className="gap-4 p-4 w-full grid">
            <hr className="border-white/20 mb-2" />
            {day.activities.length > 0 ? (
              day.activities.map((activity, idx) => (
                <Activity
                  key={idx}
                  title={activity.title}
                  time={activity.time}
                  location={activity.location}
                  cost={activity.cost}
                />
              ))
            ) : (
              <div className="font-bold text-white/20 text-2xl text-center">
                No Activities
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Days;
