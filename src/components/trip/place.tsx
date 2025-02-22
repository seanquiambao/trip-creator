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

type props = {
  selectedPlace: SelectedPlace;
  setSelectedPlace: (selected: SelectedPlace | null) => void;
};
const Place = ({ selectedPlace, setSelectedPlace }: props) => {
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
            <Input placeholder="Select time" type="time" />
            <Input placeholder="Set budget" type="number" />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setSelectedPlace(null)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction>Submit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Place;
