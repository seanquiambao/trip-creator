import { Plus } from "lucide-react";

type AddDayProps = {
  onAddDay: () => void;
};

const AddDay = ({ onAddDay }: AddDayProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-8 relative w-full mx-auto cursor-pointer border-t border-white/25"
      onClick={onAddDay}
    >
      <div className="flex flex-col items-center" data-testid="add-day">
        <Plus className="text-white" size={24} />
        <div className="font-semibold text-3xl text-white">Add a day</div>
      </div>
    </div>
  );
};

export default AddDay;
