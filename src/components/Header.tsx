"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include", // Zabezpečí odoslanie cookies
        });

        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(true);
          setUserEmail(data.email);
        } else {
          setIsAuthenticated(false);
          setUserEmail(null);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setIsAuthenticated(false);
        setUserEmail(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setIsAuthenticated(false);
        setUserEmail(null);
        if (typeof window !== "undefined") {
          window.location.href = "/auth";
        }
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Header Title */}
        <h1 className="text-lg font-bold">
          <Link href="/" onClick={closeMenu}>
            Home
          </Link>
        </h1>

        {/* Burger Menu Button (Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Navigation Links */}
        <nav
          className={`absolute lg:relative top-16 lg:top-auto right-0 w-full lg:w-auto bg-blue-600 lg:bg-transparent flex flex-col lg:flex-row items-start lg:items-center lg:space-x-4 transition-all duration-300 ${
            menuOpen ? "block" : "hidden lg:flex"
          }`}
        >
          {isAuthenticated ? (
            <>
              <span className="block lg:inline text-sm px-4 lg:px-0 py-2 lg:py-0">Hello, {userEmail || "User"}</span>
              <Link
                href="/dashboard"
                className="block lg:inline bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mb-2 lg:mb-0 mx-4 lg:mx-0"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="block lg:inline bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mx-4 lg:mx-0"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className="block lg:inline hover:underline text-white px-4 py-2 lg:py-0"
              onClick={closeMenu}
            >
              Login / Register
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
