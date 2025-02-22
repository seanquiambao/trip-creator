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
  const [trips, setTrips] = useState<Trip[]>(TRIPS);
  const [trip, setTrip] = useState<Trip>({
    id: 0,
    title: "",
    date: new Date(),
  });
  const [popup, setPopup] = useState(false);

  const handleAdd = () => {
    const newId = trips.length > 0 ? trips[trips.length - 1].id + 1 : 1;
    const newTrip = { id: newId, title: trip.title, date: trip.date };
    setTrips((prev) => [...prev, newTrip]);
    setTrip({ id: 0, title: "", date: new Date() });
  };

  const handleDelete = (id: number) => {
    const filteredTrips = trips.filter((item) => item.id !== id);
    setTrips(filteredTrips);
  };
  return (
    <div className="flex flex-col w-full p-6 gap-y-2">
      <div className="text-4xl font-bold">My Trips</div>
      <div className="grid grid-cols-3 gap-2">
        {trips.map((trip, index) => (
          <TripCard
            key={index}
            id={trip.id}
            title={trip.title}
            date={trip.date}
            handleDelete={handleDelete}
          />
        ))}
        <AddCard popup={popup} setPopup={setPopup} />
      </div>
      <AlertDialog open={popup} data-testid="add-trip-title">
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add a Trip</AlertDialogTitle>
          </AlertDialogHeader>
          <Input
            placeholder="title"
            onChange={(e) =>
              setTrip((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <AlertDialogCancel onClick={() => setPopup(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleAdd();
              setPopup(false);
            }}
          >
            Add
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Page;
