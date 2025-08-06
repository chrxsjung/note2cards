// src/app/login/page.tsx
"use client";

import { handleLogin } from "./actions";
import { useState, useActionState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [state, formAction] = useActionState(handleLogin, { error: "" });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl md:text-7xl font-bold mb-8 px-6">Log In</h1>

      <form
        action={formAction}
        className="flex flex-col gap-6 p-4 items-center justify-center"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter email..."
          className="w-48 md:w-72 px-4 py-3 rounded-md text-white-500 border-2 border-gray-400"
          required
        />

        <div className="relative w-48 md:w-72">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password..."
            className="w-full px-4 py-3 pr-10 rounded-md text-white-500 border-2 border-gray-400"
            required
          />
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        <button
          type="submit"
          className="w-48 md:w-72 bg-white text-black px-5 py-3 rounded-md hover:bg-gray-200 text-lg font-medium hover:cursor-pointer"
        >
          Log In
        </button>

        <p className="text-white-500">
          Don't have an account?{" "}
          <Link href="/signup" className="underline hover:text-gray-400">
            Sign Up
          </Link>
        </p>
      </form>

      {state?.error && (
        <p className="text-red-400 text-sm mt-2">{state.error}</p>
      )}
    </div>
  );
}
