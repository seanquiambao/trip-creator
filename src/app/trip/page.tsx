"use client";
import TripCard from "@/components/trip/trip-card";
import AddCard from "@/components/trip/add-card";
import { useEffect, useState } from "react";
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
import { api } from "@/utils/api";
import { auth } from "@/utils/firebase-client";
import { toast } from "react-hot-toast";
import { Label } from "@/components/ui/label";
import SelectCalendar from "@/components/global/select-calendar";

const Page = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [trip, setTrip] = useState<Trip>({
    id: "",
    title: "",
    date: undefined,
  });
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const user = auth.currentUser;
    const token = await user?.getIdToken(true); // Force token refresh

    await api({
      method: "GET",
      url: "/api/trip",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const tripsData = response.items;
        if (tripsData.length <= 0) {
          return;
        }

        const tripsWithDates = tripsData.map((trip: Trip) => {
          if (typeof trip.date === "string") {
            trip.date = new Date(trip.date); // Convert to Date object
          }
          return trip;
        });
        setTrips(
          tripsWithDates.filter((trip: Trip) => trip.title !== undefined)
        );
      })
      .catch(() => {
        toast.error("Failed to fetch");
      });
  };

  const handleAdd = async () => {
    const newTrip = { title: trip.title, date: trip.date };
    const user = auth.currentUser;
    const token = await user?.getIdToken(true); // Force token refresh
    await api({
      method: "POST",
      url: "/api/trip",
      body: { title: trip.title, date: trip.date },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      const items = response.items;
      setTrips((prev) => [
        ...prev,
        { id: items.docRefId, ...newTrip } as unknown as Trip,
      ]);
      setTrip({ id: "", title: "", date: new Date() });
    });
  };

  const handleDelete = async (id: string) => {
    await api({
      method: "DELETE",
      url: "/api/trip",
      body: {
        id: id,
      },
    }).then(() => {
      setTrips((prev) => prev.filter((trip) => trip.id !== id));
    });
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
          <Label>Trip Name</Label>
          <Input
            placeholder="title"
            onChange={(e) =>
              setTrip((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <Label>Date</Label>
          <SelectCalendar trip={trip} setTrip={setTrip} />
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
