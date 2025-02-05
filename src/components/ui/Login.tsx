"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth || !db) {
      setError("Firebase is not initialized.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      let username = "User";
      if (userDoc.exists()) {
        username = userDoc.data().username || "User";
      }

      router.push(`/home?username=${encodeURIComponent(username)}`);
    } catch (err) {
      setError("Failed to log in. Check your credentials.");
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm flex flex-col items-center">
        <Image
          src="/tc_logo.jpeg"
          alt="Logo"
          width={240}
          height={240}
          className="mb-6"
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
          <button
            type="submit"
            className="bg-[#2E627E] text-white font-bold p-3 rounded-lg w-full"
          >
            Login
          </button>
        </form>

        <Link
          href="/signup"
          className="bg-gray-300 text-black font-bold p-3 rounded-lg hover:bg-gray-400 w-full transition duration-200 ease-in-out mt-4 text-center"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
