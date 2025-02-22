import { PopoverContent } from "@radix-ui/react-popover";
import { Popover, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
type props = {
  title: string;
  date: Date;
};
const TripDetail = ({ title, date }: props) => {
  return (
    <div>
      <div className="text-white font-bold text-6xl">{title}</div>
      <Popover>
        <PopoverTrigger className="text-white font-bold text-4xl">
          {date.toLocaleDateString()}
        </PopoverTrigger>
        <PopoverContent>
          <Calendar className="bg-white rounded-md" initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TripDetail;
