"use client";

import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">{isLogin ? "Login" : "Register"}</h2>
      {isLogin ? <LoginForm onSwitchToRegister={toggleForm} /> : <RegisterForm onSwitchToLogin={toggleForm} />}
      <p className="text-center mt-4">
        {isLogin ? (
          <>
            <p>Don’t have an account?</p>
            <button onClick={toggleForm} className="text-blue-600 hover:underline">
              Register
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button onClick={toggleForm} className="text-blue-600 hover:underline">
              Login
            </button>
          </>
        )}
      </p>
    </div>
  );
}
