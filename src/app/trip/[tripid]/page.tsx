"use client";
import Days from "@/components/days";
import Map from "@/components/trip/map";
import TripDetail from "@/components/trip/trip-detail";
import { Day } from "@/types/trip";
import { useState } from "react";
import { DAYS } from "@/data/trips";

const Page = () => {
  const [days, setDays] = useState<Day[]>(DAYS);
  return (
    <div className="bg-trip-navy/90 flex flex-row items-center justify-between w-full h-fit">
      <div className="self-start p-6 w-2/3 overflow-y-auto max-h-screen">
        <TripDetail title="San Diego Trip 2025" date={new Date()} />
        <Days days={days} />
      </div>
      <Map days={days} setDays={setDays} />
    </div>
  );
};

export default Page;
