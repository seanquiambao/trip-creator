import { Plus } from "lucide-react";

type props = {
  popup: boolean;
  setPopup: (value: boolean) => void;
};
const AddCard = ({ popup, setPopup }: props) => {
  return (
    <div
      onClick={() => setPopup(!popup)}
      className="cursor-pointer rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200 flex flex-col items-center"
    >
      <Plus className="text-black" size={64} />
      <div className="font-bold text-2xl">Add Trip</div>
    </div>
  );
};

export default AddCard;
