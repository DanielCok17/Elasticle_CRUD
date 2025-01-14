"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false); // To handle hydration issues

  useEffect(() => {
    setHydrated(true); // Mark as hydrated to ensure dynamic content renders after SSR
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
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

  if (!hydrated) return null; // Prevent rendering until the client is hydrated

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Header Title */}
        <h1 className="text-xl lg:text-2xl font-extrabold tracking-wide">
          <Link href="/" onClick={closeMenu} className="hover:text-gray-200 transition duration-300">
            Home
          </Link>
        </h1>

        {/* Burger Menu Button (Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Navigation Links */}
        <nav
          className={`absolute lg:relative top-16 lg:top-auto right-0 w-full lg:w-auto bg-gradient-to-r from-blue-600 to-blue-700 lg:bg-transparent flex flex-col lg:flex-row items-start lg:items-center lg:space-x-6 p-4 lg:p-0 transition-all duration-300 ${
            menuOpen ? "block" : "hidden lg:flex"
          }`}
        >
          {isAuthenticated ? (
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white text-blue-600 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 11.25v.45a6.75 6.75 0 01-7.5 0v-.45m7.5-5.25a3 3 0 11-6 0 3 3 0 016 0zm7.5 13.5a6.75 6.75 0 00-6.75-6.75h-9a6.75 6.75 0 00-6.75 6.75v.75h22.5v-.75z"
                    />
                  </svg>
                </div>
                <span className="text-sm lg:text-base font-medium">Hello, {userEmail || "User"}</span>
              </div>
              <Link
                href="/dashboard"
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg flex items-center space-x-2"
                onClick={closeMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3h16.5M3.75 21h16.5M4.5 6.75h15a.75.75 0 01.75.75v9a.75.75 0 01-.75.75h-15a.75.75 0 01-.75-.75v-9a.75.75 0 01.75-.75z"
                  />
                </svg>
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25h-3a2.25 2.25 0 00-2.25 2.25V9m-3.75 9H3.75m0 0a2.25 2.25 0 01-2.25-2.25v-7.5a2.25 2.25 0 012.25-2.25h16.5a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25H3.75zm13.5 0V18m-3-3.75h6"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="hover:underline text-white px-4 py-2 lg:py-0 text-sm font-medium flex items-center space-x-2"
              onClick={closeMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25h-3a2.25 2.25 0 00-2.25 2.25V9m0 6h12m-7.5-6h3.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25H7.5a2.25 2.25 0 01-2.25-2.25v-7.5a2.25 2.25 0 012.25-2.25H11.25"
                />
              </svg>
              <span>Sign In</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
