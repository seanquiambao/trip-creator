import React from "react";

interface ErrorProps {
  code: number;
  message: string;
}

const Error: React.FC<ErrorProps> = ({ code, message }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-trip-navy text-white">
      <div className="text-5xl font-bold text-[#589FA3]">{code}</div>
      <div className="text-2xl font-bold mb-4 text-black">{message}</div>
    </div>
  );
};

export default Error;
