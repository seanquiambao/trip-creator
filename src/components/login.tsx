"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api({
        method: "POST",
        url: "/api/login",
        body: form,
      }).then((response) => {
        if (response.message === "OK") {
          router.push("/trip");
        }
      });
    } catch (err) {
      setError(`${err}`);
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
            className="bg-trip-navy text-white font-bold p-3 rounded-lg w-full"
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
