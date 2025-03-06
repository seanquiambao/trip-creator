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

  const handleAddDay = async () => {
    const user = auth.currentUser;
    const token = await user?.getIdToken(true); // Force token refresh

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
      setTripDate(new Date(data.date));
      setDays(data.days);
    });
  };
  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <>
      <div className="p-6 w-2/3 h-full overflow-y-auto">
        <TripDetail
          title="San Diego Trip 2025"
          date={new Date()}
          budget={200}
        />
        <Days tripDate={tripDate} days={days} setDays={setDays} />
        <AddDay onAddDay={handleAddDay} />
      </div>
      <Map days={days} setDays={setDays} tripid={tripid} />
    </>
  );
};

export default TripEditor;
