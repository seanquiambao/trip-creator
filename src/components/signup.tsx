"use client";
import { useState } from "react";
import { api } from "@/utils/api";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api({
        url: "/api/signup",
        method: "POST",
        body: form,
      });
    } catch {
      setError("Signup failed. Please try again.");
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
