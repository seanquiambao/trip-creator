import Link from "next/link";

interface props {
  title: string;
  id: number;
  date: Date;
}

const TripCard = ({ id, title, date }: props) => {
  return (
    <Link
      href={`/plan/${id}`}
      className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200 block"
    >
      <div className="text-4xl font-bold mb-2">{title}</div>
      <div className="text-gray-600 mb-1">{date.toDateString()}</div>
    </Link>
  );
};

export default TripCard;
