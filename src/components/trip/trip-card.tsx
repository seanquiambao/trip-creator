import { X } from "lucide-react";
import Link from "next/link";

interface props {
  title: string;
  id: string;
  date: Date | undefined;
  handleDelete: (id: string) => void;
}

const TripCard = ({ id, title, date, handleDelete }: props) => {
  return (
    <div
      className="rounded-2xl relative shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200 block"
      data-testid="trip-card"
    >
      <X
        onClick={() => handleDelete(id)}
        className="absolute top-2 right-2 cursor-pointer"
        data-testid={`remove-trip-${id}`}
      />
      <Link className="text-4xl font-bold mb-2" href={`/trip/${id}`}>
        {title}
      </Link>

      <div className="text-gray-600 mb-1">{date?.toLocaleDateString()}</div>
    </div>
  );
};

export default TripCard;
