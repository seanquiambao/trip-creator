import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="text-3xl font-bold text-white">Loading...</div>
      <LoaderCircle className="animate-spin text-white" />
    </div>
  );
};

export default Loading;
