import Image from "next/image";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Place = () => {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Open Details</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>The Reptile Zoo</AlertDialogTitle>
          <AlertDialogDescription>
            18818 Brookhurst St, Fountain Valley, CA 92708
            <br /> Opens 7PM
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-2/3">
            <Calendar selected={date} onSelect={setDate} />
            <Input placeholder="Select time" type="time" />
            <Input placeholder="Set budget" type="number" />
          </div>
          <Image
            src="/reptile-zoo.jpg"
            alt="Reptile Zoo"
            width={150}
            height={150}
            className="rounded-lg"
          />
        </div>
        <AlertDialogFooter>
          <Button variant="destructive">Cancel</Button>
          <Button variant="default">Submit</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Place;
