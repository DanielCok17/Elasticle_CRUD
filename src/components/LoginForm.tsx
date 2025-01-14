"use client";

import { useState } from "react";

const Input = ({
  type,
  placeholder,
  value,
  onChange,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
);

export default function LoginForm({ onSwitchToRegister }: { onSwitchToRegister: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Invalid login");
      return;
    }

    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg p-6 sm:max-w-md lg:max-w-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Login</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {loading && ( // Loader and message
        <div className="flex flex-col items-center mb-4">
          <div className="loader"></div>
          <p className="text-blue-600 mt-2">Logging in, please wait...</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button
          type="submit"
          className={`w-full py-2 rounded-md text-white transition duration-300 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4 text-sm text-gray-600">
        Don’t have an account?{" "}
        <button onClick={onSwitchToRegister} className="text-blue-600 hover:underline focus:outline-none">
          Register
        </button>
      </p>
    </div>
  );
}
