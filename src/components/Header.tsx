"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Kontrola autentifikácie na strane klienta cez cookies
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include", // Povolenie posielania cookies
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
  }, []); // Vykonanie raz pri mountnutí

  const handleLogout = async () => {
    // Odhlásenie používateľa
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // Povolenie cookies
      });

      if (res.ok) {
        setIsAuthenticated(false);
        setUserEmail(null);
        window.location.href = "/auth"; // Presmerovanie na stránku /auth
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">User Profile Management</h1>
        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {/* Prihlásený používateľ */}
              <span className="text-sm">{userEmail || "User"}</span>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Neprihlásený používateľ */}
              <Link href="/auth" className="hover:underline">
                Login / Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
