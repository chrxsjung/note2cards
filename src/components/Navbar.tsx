"use client";

import { handleLogout } from "@/app/logout/actions";
import { FileText, MenuIcon, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-between items-center px-6 py-4 border-b relative">
      <div className="text-2xl font-bold flex items-center gap-2">
        <FileText size={24} className="text-blue-600" />
        Note2Cards
      </div>

      <div className="hidden md:flex items-center gap-6 text-lg font-medium">
        <Link
          href="/dashboard"
          className="hover:text-blue-600 transition cursor-pointer"
        >
          Home
        </Link>
        <button className="hover:text-blue-600 transition cursor-pointer">
          Settings
        </button>
        <button
          className="hover:text-blue-600 transition cursor-pointer"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>

      {/* mobile nav toggle button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(true)}>
          <MenuIcon size={24} className="text-blue-600" />
        </button>
      </div>

      {/* fullscreen mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center gap-6 text-2xl font-semibold">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-6"
          >
            <X size={28} className="text-blue-600" />
          </button>

          <Link
            href="/dashboard"
            className="hover:text-blue-600 transition cursor-pointer"
          >
            Home
          </Link>
          <button className="hover:text-blue-600 transition cursor-pointer">
            Settings
          </button>
          <button
            className="hover:text-blue-600 transition cursor-pointer"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
