"use client";
import { useState } from "react";
import { auth, db } from "@/lib/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username: username,
      });

      alert("Signup successful!");

      router.push(`/home?username=${username}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Signup failed. " + err.message);
      } else {
        setError("Signup failed due to an unknown error.");
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSignup} className="flex flex-col w-full">
          <input
            type="text"
            placeholder="Username"
            className="p-3 border border-gray-300 rounded-lg mb-4 w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-lg mb-4 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-lg mb-4 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#2E5C72] text-white font-bold p-3 rounded-lg hover:bg-[#254A5B] w-full transition duration-200 ease-in-out"
          >
            sign up
          </button>
        </form>
      </div>
    </div>
  );
}
