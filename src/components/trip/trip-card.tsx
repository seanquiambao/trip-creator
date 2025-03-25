import { X } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  id: string;
  date: Date | undefined;
  handleDelete: (id: string) => void;
}

const TripCard = ({ id, title, date, handleDelete }: Props) => {
  return (
    <div
      className="rounded-lg relative shadow-md p-4 hover:shadow-lg transition-shadow duration-300 border border-gray-200 w-full"
      data-testid="trip-card"
    >
      <X
        onClick={() => handleDelete(id)}
        className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-red-500 transition-colors duration-200"
        data-testid={`remove-trip-${id}`}
      />
      <Link
        className="text-3xl md:text-4xl font-bold mb-2 block"
        href={`/trip/${id}`}
      >
        {title}
      </Link>

      <div className="text-gray-600 mb-1">{date?.toLocaleDateString()}</div>
    </div>
  );
};

export default TripCard;
