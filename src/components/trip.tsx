import Link from "next/link";

interface TripProps {
  title: string;
  date: string;
  duration: string;
}

const TripCard = ({ title, date, duration }: props) => {
  return (
    <div className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-1">{date}</p>
      <p className="text-gray-500">{duration}</p>
    </div>
  );
};

export default TripCard;
