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
import { Day } from "@/types/trip";
import { useState } from "react";
import Select from "@/components/global/select";

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
  const [selectedDay, setSelectedDay] = useState(0);
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
            />
            <Input placeholder="Select time" type="time" />
            <Input placeholder="Set budget" type="number" />
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
