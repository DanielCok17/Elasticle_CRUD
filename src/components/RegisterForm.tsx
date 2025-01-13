"use client";

import { useState } from "react";

export default function RegisterForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validation, setValidation] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({
    formError: "",
  });

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[\W_]/.test(password)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validation.email || !validation.password || !validation.confirmPassword) {
      setErrors({ ...errors, formError: "Please fix the errors before submitting" });
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors({ ...errors, formError: data.error || "Registration failed" });
        return;
      }

      onSwitchToLogin();
    } catch {
      setErrors({ ...errors, formError: "An error occurred. Please try again later." });
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });

    if (field === "email") {
      setValidation({ ...validation, email: validateEmail(value) });
    } else if (field === "password") {
      setValidation({ ...validation, password: validatePassword(value) });
    } else if (field === "confirmPassword") {
      setValidation({ ...validation, confirmPassword: value === formData.password });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 sm:max-w-lg lg:max-w-xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Register</h2>
      {errors.formError && <p className="text-red-500 text-center mb-4">{errors.formError}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            className={`w-full border rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 ${
              validation.email ? "border-green-500 focus:ring-green-500" : "border-red-500 focus:ring-red-500"
            }`}
            required
          />
          {formData.email && <span className="absolute right-3 top-3 text-lg">{validation.email ? "✅" : "❌"}</span>}
        </div>
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleFieldChange("password", e.target.value)}
            className={`w-full border rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 ${
              validation.password ? "border-green-500 focus:ring-green-500" : "border-red-500 focus:ring-red-500"
            }`}
            required
          />
          {formData.password && (
            <span className="absolute right-3 top-3 text-lg">{validation.password ? "✅" : "❌"}</span>
          )}
        </div>
        <div className="relative">
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => handleFieldChange("confirmPassword", e.target.value)}
            className={`w-full border rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 ${
              validation.confirmPassword ? "border-green-500 focus:ring-green-500" : "border-red-500 focus:ring-red-500"
            }`}
            required
          />
          {formData.confirmPassword && (
            <span className="absolute right-3 top-3 text-lg">{validation.confirmPassword ? "✅" : "❌"}</span>
          )}
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded-md text-white transition duration-300 ${
            validation.email && validation.password && validation.confirmPassword
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!validation.email || !validation.password || !validation.confirmPassword}
        >
          Register
        </button>
      </form>
      <p className="text-center mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <button onClick={onSwitchToLogin} className="text-blue-600 hover:underline focus:outline-none">
          Login
        </button>
      </p>
      <div className="text-sm text-gray-500 mt-4">
        <p>Password Requirements:</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>At least 8 characters</li>
          <li>At least one uppercase letter</li>
          <li>At least one lowercase letter</li>
          <li>At least one number</li>
          <li>At least one special character (e.g., !@#$%^&*)</li>
        </ul>
      </div>
    </div>
  );
}
