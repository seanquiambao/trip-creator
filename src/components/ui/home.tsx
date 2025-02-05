"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {" "}
      {}
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "User";

  return (
    <div className="h-screen flex items-center justify-center bg-white px-4">
      <h1 className="text-3xl font-bold">
        Welcome to the Trip Creator, {username}!
      </h1>
    </div>
  );
}
