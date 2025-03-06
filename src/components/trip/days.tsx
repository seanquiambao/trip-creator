import { X } from "lucide-react";
import Activity from "./activity";
import { Day } from "@/types/trip";

type props = {
  tripDate: Date;
  days: Day[];
  setDays: (value: Day[]) => void;
};

const Days = ({ tripDate, days, setDays }: props) => {
  const handleDelete = (dayKey: number, activityKey: number): void => {
    const updatedDays = days.map((day, index) => {
      if (index === dayKey) {
        return {
          ...day,
          activities: day.activities.filter((_, idx) => idx !== activityKey),
        };
      }
      return day;
    });

    setDays(updatedDays);
  };

  const handleRemoveDay = (indexToRemove: number) => {
    const filteredDays = days.filter((_, index) => index !== indexToRemove);
    setDays(filteredDays);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {days?.length > 0 ? (
        days.map((day, index) => (
          <div
            key={index}
            className="flex flex-row text-white w-full border-t border-white/25 items-center py-6"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-6">
                <X
                  size={28}
                  className="cursor-pointer text-white hover:text-white/50"
                  data-cy={`remove-day-${index}`}
                  onClick={() => handleRemoveDay(index)}
                />
                <div className="font-bold text-center">
                  <div className="text-5xl">DAY</div>
                  <div className="text-7xl">
                    {(index + 1).toString().padStart(2, "0")}
                  </div>
                  <div className="text-white/20 text-2xl pt-4">
                    {new Date(
                      new Date(tripDate).setDate(tripDate.getDate() + index)
                    ).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="gap-4 p-4 w-full grid">
              {day.activities.length > 0 ? (
                day.activities.map((activity, idx) => (
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
                ))
              ) : (
                <div className="font-bold text-white/20 text-2xl text-center">
                  No Activities
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="font-bold text-white/20 text-2xl text-center p-5">
          No Days
        </div>
      )}
    </div>
  );
};

export default Days;
