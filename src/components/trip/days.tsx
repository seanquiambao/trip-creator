import { X } from "lucide-react";
import Activity from "./activity";
import { Day } from "@/types/trip";
import { api } from "@/utils/api";
import { auth } from "@/utils/firebase-client";

type props = {
  tripDate: Date;
  days: Day[];
  tripid: string;
  setDays: (value: Day[]) => void;
};

const Days = ({ tripDate, days, setDays, tripid }: props) => {
  const handleDelete = async (dayKey: number, activityKey: number) => {
    const user = auth.currentUser;
    const token = await user?.getIdToken(true);
    await api({
      method: "DELETE",
      url: `/api/trip/${tripid}`,
      body: {
        type: "activities",
        dayIndex: dayKey,
        activitiesIndex: activityKey,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const updatedDays = [...days];
    const dayIndex = updatedDays.findIndex((day) => day.day === dayKey) + 1;
    if (dayIndex === dayKey) {
      updatedDays[dayIndex].activities = updatedDays[
        dayIndex
      ].activities.filter((_, index) => index !== activityKey);
      setDays(updatedDays);
    }
  };

  const handleRemoveDay = async (indexToRemove: number) => {
    const user = auth.currentUser;
    const token = await user?.getIdToken(true);
    await api({
      method: "DELETE",
      url: `/api/trip/${tripid}`,
      body: { type: "days", dayIndex: indexToRemove },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const filteredDays = days.filter((_, index) => index !== indexToRemove);
    setDays(filteredDays);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {days?.length > 0 ? (
        days.map((day, index) => (
          <div
            key={index}
            className="relative flex flex-col md:flex-row text-white w-full border-t border-white/25 items-center py-6"
          >
            <X
              size={28}
              className="absolute top-1 right-0 cursor-pointer text-white hover:text-white/50"
              data-cy={`remove-day-${index}`}
              onClick={() => handleRemoveDay(index)}
            />
            <div className="flex flex-col items-center justify-center w-full">
              <div className="flex items-center gap-6">
                <div className="font-bold text-center">
                  <div className="text-4xl">DAY</div>
                  <div className="text-5xl">
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
