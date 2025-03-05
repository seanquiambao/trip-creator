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
import { TIME } from "@/data/time";
import { auth } from "@/utils/firebase-client";
import { api } from "@/utils/api";

type props = {
  selectedPlace: SelectedPlace;
  setSelectedPlace: (selected: SelectedPlace | null) => void;
  days: Day[];
  setDays: (value: Day[]) => void;
  tripid: string;
};
const PlaceModal = ({
  selectedPlace,
  setSelectedPlace,
  days,
  setDays,
  tripid,
}: props) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [activity, setActivity] = useState<Activity>({
    title: selectedPlace.name,
    location: selectedPlace.address,
    time: "",
    cost: 0,
  });

  const handleChange = (value: string, index: number, type: "day" | "time") => {
    if (type === "day") {
      setSelectedDay(index); // Handle index for Day select
    } else if (type === "time") {
      setActivity({ ...activity, time: value }); // Handle value for Time select
    }
  };

  const handleAdd = async () => {
    const user = auth.currentUser;
    const token = await user?.getIdToken(true); // Force token refresh
    await api({
      method: "PUT",
      url: `/api/trip/${tripid}`,
      body: {
        selectedDay: selectedDay,
        activity: activity,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const updatedDays = [...days]; // Copy the current days array

    if (selectedDay === null) {
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
  };

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
              onChange={(value, index) => handleChange(value, index, "day")}
            />
            <Select
              meta={{
                options: TIME,
                placeholder: "Select Time",
              }}
              onChange={(value, index) => handleChange(value, index, "time")}
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
            onClick={handleAdd}
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
