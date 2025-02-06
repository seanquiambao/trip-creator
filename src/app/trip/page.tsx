"use client";
import TripCard from "@/components/trip/trip-card";
import AddCard from "@/components/trip/add-card";
import { TRIPS } from "@/data/trips";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Trip } from "@/types/trip";

const Page = () => {
  const [popup, setPopup] = useState(false);
  const [trip, setTrip] = useState<Trip>({
    id: 1,
    title: "Hello",
    date: new Date(),
  });
  return (
    <div className="flex flex-col w-full p-6 gap-y-2">
      <div className="text-4xl font-bold">My Trips</div>
      <div className="grid grid-cols-3 gap-2">
        {TRIPS.map((trip, index) => (
          <TripCard
            key={index}
            id={trip.id}
            title={trip.title}
            date={trip.date}
          />
        ))}
        <AddCard popup={popup} setPopup={setPopup} />
      </div>
      <AlertDialog open={popup}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add a Trip</AlertDialogTitle>
          </AlertDialogHeader>
          <Input placeholder="title" />
          <AlertDialogCancel onClick={() => setPopup(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => setPopup(false)}>
            Add
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Page;
