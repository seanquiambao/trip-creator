"use client";
import { useState } from "react";
import { auth, db } from "@/lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const username = userDoc.exists() ? userDoc.data()?.username : "User";

      router.push(`/home?username=${username}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Login failed. " + err.message);
      } else {
        setError("Login failed due to an unknown error.");
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm flex flex-col items-center">
        {}
        <Image
          src="/tc_logo.jpeg"
          alt="Trip Creator Logo"
          width={200}
          height={200}
          className="mb-4"
        />

        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col w-full">
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

          {}
          <button
            type="submit"
            className="bg-[#2E5C72] text-white font-bold p-3 rounded-lg hover:bg-[#254A5B] w-full transition duration-200 ease-in-out"
          >
            login
          </button>

          {}
          <Link
            href="/signup"
            className="bg-gray-300 text-[#2E5C72] font-bold p-3 rounded-lg hover:bg-gray-400 w-full transition duration-200 ease-in-out mt-4 text-center"
          >
            sign up
          </Link>
        </form>
      </div>
    </div>
  );
}
