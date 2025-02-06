"use client";
import { useState } from "react";
import { auth, db } from "@/utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth || !db) {
      setError("Firebase is not initialized.");
      return;
    }

    try {
      const { username, email, password } = form;
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), { username });

      // Redirect to home page with username
      router.push(`/home?username=${encodeURIComponent(username)}`);
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error("Signup Error:", err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSignup} className="flex flex-col">
          <input
            type="text"
            placeholder="Username"
            className="p-3 border border-gray-300 rounded-lg mb-4 w-full"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-lg mb-4 w-full"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-lg mb-4 w-full"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-trip-navy text-white font-bold p-3 rounded-lg"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
