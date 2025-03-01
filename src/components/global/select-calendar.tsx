import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Trip } from "@/types/trip";
import { useState } from "react";
import { Button } from "../ui/button";

type props = {
  trip: Trip;
  setTrip: (value: Trip) => void;
};

const SelectCalendar = ({ trip, setTrip }: props) => {
  const [date, setDate] = useState<Date | undefined>(trip.date);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
          onClick={() => setIsOpen(true)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? date.toLocaleDateString() : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          fromDate={new Date()}
          onSelect={(newDate) => {
            setDate(newDate);
            setTrip({ ...trip, date: newDate });
            setIsOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default SelectCalendar;
