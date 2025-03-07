"use client";
import { useState, useEffect } from "react";
import Days from "@/components/trip/days";
import Map from "@/components/trip/map";
import TripDetail from "@/components/trip/trip-detail";
import AddDay from "@/components/trip/add-day";
import { Day } from "@/types/trip";
import { api } from "@/utils/api";
import { auth } from "@/utils/firebase-client";
type props = {
  tripid: string;
};
const TripEditor = ({ tripid }: props) => {
  const [days, setDays] = useState<Day[]>([]);
  const [tripDate, setTripDate] = useState<Date>(new Date());
  const [tripTitle, setTripTitle] = useState<string>("");
  const [tripBudget, setTripBudget] = useState<number>(0);

  const handleAddDay = async () => {
    const user = auth.currentUser;
    const token = await user?.getIdToken(true);

    await api({
      method: "POST",
      url: `/api/trip/${tripid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!days) {
      setDays([
        {
          date: tripDate,
          day: 1,
          activities: [],
        },
      ]);
      return;
    }
    const lastDay = days[days.length - 1];
    const newDate = lastDay
      ? new Date(lastDay.date?.getTime() + 24 * 60 * 60 * 1000)
      : new Date();

    const newDay: Day = {
      day: days.length + 1,
      date: newDate,
      activities: [],
    };

    setDays([...days, newDay]);
  };

  const handleFetch = async () => {
    const user = auth.currentUser;
    const token = await user?.getIdToken(true); // Force token refresh
    await api({
      method: "GET",
      url: `/api/trip/${tripid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      const data = response.items;
      const tripDate = data.date ? new Date(data.date) : null;
      setTripDate(tripDate ?? new Date());
      setDays(data.days);
      setTripTitle(data.title);

      const totalBudget =
        data.days?.reduce((acc: number, day: any) => {
          const dayTotal = day.activities?.reduce(
            (sum: number, activity: any) => sum + (activity.cost || 0),
            0
          );
          return acc + dayTotal;
        }, 0) || 0;
      setTripBudget(totalBudget);
    });
  };
  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    if (!days || !Array.isArray(days)) return;
    const totalBudget = days.reduce((acc, day) => {
      const dayTotal = (day.activities || []).reduce(
        (sum, activity) => sum + (activity.cost || 0),
        0
      );
      return acc + dayTotal;
    }, 0);
    setTripBudget(totalBudget);
  }, [days]);
  
  return (
    <>
      <div className="p-6 w-2/3 h-full overflow-y-auto">
        <TripDetail
          title={tripTitle || "Loading..."}
          date={tripDate || new Date()}
          budget={tripBudget}
        />
        <Days
          tripDate={tripDate}
          days={days}
          setDays={setDays}
          tripid={tripid}
        />
        <AddDay onAddDay={handleAddDay} />
      </div>
      <Map days={days} setDays={setDays} tripid={tripid} />
    </>
  );
};

export default TripEditor;
