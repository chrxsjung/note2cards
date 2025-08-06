//set up signup page

"use client";
import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //use refs to get values from input fields
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    //sign up user with supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      //if good, redirect to home page which i didnt make yet lol
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl md:text-7xl font-bold mb-8 px-6">Sign Up</h1>

      {success ? (
        <div className="text-center flex flex-col items-center gap-4">
          <p className="text-white-500">
            ✅ Signup successful! Please check your email for verification.
          </p>
          <Link href="/login" className="text-blue-400 underline">
            Go to login
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-6 p-4 items-center justify-center"
        >
          <input
            type="text"
            ref={emailRef}
            placeholder="Enter email..."
            className="w-48 md:w-72 px-4 py-3 rounded-md text-white-500 border-2 border-gray-400"
          />

          <div className="relative w-48 md:w-72">
            <input
              type={showPassword ? "text" : "password"}
              ref={passwordRef}
              placeholder="Enter password..."
              className="w-full px-4 py-3 pr-10 rounded-md text-white-500 border-2 border-gray-400"
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
            Sign Up
          </button>

          {error && (
            <p className="text-red-400 text-sm text-center mt-2">{error}</p>
          )}
        </form>
      )}
    </div>
  );
}
