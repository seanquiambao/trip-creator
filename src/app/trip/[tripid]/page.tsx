"use client";
import Days from "@/components/trip/days";
import Map from "@/components/trip/map";
import TripDetail from "@/components/trip/trip-detail";
import { Day } from "@/types/trip";
import { useState } from "react";
import { DAYS } from "@/data/trips";
import AddDay from "@/components/trip/add-day";

const Page = () => {
  const [days, setDays] = useState<Day[]>(DAYS);

  const handleAddDay = () => {
    const lastDay = days[days.length - 1];
    const newDate = lastDay
      ? new Date(lastDay.date.getTime() + 24 * 60 * 60 * 1000)
      : new Date();

    const newDay: Day = {
      day: days.length + 1,
      date: newDate,
      activities: [],
    };

    setDays([...days, newDay]);
  };

  return (
    <div className="bg-trip-navy/90 flex flex-row items-center justify-between w-full h-fit">
      <div className="self-start p-6 w-2/3 overflow-y-auto max-h-screen">
        <TripDetail title="San Diego Trip 2025" date={new Date()} />
        <Days days={days} setDays={setDays} />
        <AddDay onAddDay={handleAddDay} />
      </div>
      <Map days={days} setDays={setDays} />
    </div>
  );
};

export default Page;
