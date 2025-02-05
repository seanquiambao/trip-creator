"use client";
import { useSearchParams } from "next/navigation";

export default function homePage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "User";

  return (
    <div className="h-screen flex items-center justify-center bg-white px-4">
      <h1 className="text-3xl font-bold">Welcome to the Trip Creator, {username}!</h1>
    </div>
  );
}
