import { Calendar, DollarSign } from "lucide-react";

type props = {
  title: string;
  date: Date;
  budget: number;
};
const TripDetail = ({ title, date, budget }: props) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start pb-10">
      <div className="text-white font-bold text-4xl md:text-6xl w-full">
        {title}
      </div>
      <div className="flex flex-col w-full gap-2 self-center">
        <div className="text-white opacity-50 inline-flex text-lg md:text-2xl gap-4 items-center">
          <Calendar />
          {date.toDateString()}
        </div>
        <div className="text-white opacity-50 inline-flex text-lg md:text-2xl gap-4 items-center">
          <DollarSign />
          {budget}
        </div>
      </div>
    </div>
  );
};

export default TripDetail;
