"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { SelectedPlace } from "@/types/place";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { Activity, Day } from "@/types/trip";
import { useState } from "react";
import Select from "@/components/global/select";
import toast from "react-hot-toast";

type props = {
  selectedPlace: SelectedPlace;
  setSelectedPlace: (selected: SelectedPlace | null) => void;
  days: Day[];
  setDays: (value: Day[]) => void;
};
const PlaceModal = ({
  selectedPlace,
  setSelectedPlace,
  days,
  setDays,
}: props) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [activity, setActivity] = useState<Activity>({
    title: selectedPlace.name,
    location: selectedPlace.address,
    time: "",
    cost: 0,
  });
  return (
    <AlertDialog open={selectedPlace !== null}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{selectedPlace.name}</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedPlace.address}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-2/3">
            <Select
              meta={{
                options: days.map((item) => "Day " + item.day),
                placeholder: "Select Day",
              }}
              onChange={(index) => setSelectedDay(index)}
            />
            <Input
              placeholder="Select time"
              type="time"
              onChange={(e) =>
                setActivity({ ...activity, time: e.target.value })
              }
            />
            <Input
              placeholder="Set budget"
              type="number"
              onChange={(e) =>
                setActivity({ ...activity, cost: Number(e.target.value) })
              }
            />
          </div>
        </div>
        <AlertDialogFooter className="flex flex-row gap-2">
          <AlertDialogCancel
            className="bg-destructive hover:bg-desctructive text-white hover:text-white font-bold"
            onClick={() => setSelectedPlace(null)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              const updatedDays = [...days]; // Copy the current days array

              if (!selectedDay) {
                toast.error("Please Select a day");
                return;
              }
              updatedDays[selectedDay] = {
                ...updatedDays[selectedDay], // Spread to preserve other properties of the day
                activities: [...updatedDays[selectedDay].activities, activity], // Concatenate new activity
              };

              // Update the state with the new array
              setDays(updatedDays);
              setSelectedPlace(null);
            }}
            className="bg-trip-navy text-white px-3 font-semibold rounded-md"
          >
            Add
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PlaceModal;
