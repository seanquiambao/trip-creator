import { Plus } from "lucide-react";

const AddCard = () => {
  return (
    <div className="cursor-pointer rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200 flex flex-col items-center">
      <Plus className="text-black" size={64} />
      <div className="font-bold text-2xl">Add Trip</div>
    </div>
  );
};

export default AddCard;
