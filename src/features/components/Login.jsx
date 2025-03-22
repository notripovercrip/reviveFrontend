import React, { useState } from "react";
import { BACKEND_URL } from "../../app/constant";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace with your backend auth endpoint
      const response = await fetch(
        `${BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data?.message || "Login failed.");
        return;
      }

      setSuccess("Login successful!");
      // Save token or user data as needed
      localStorage.setItem("userId", data.userId);
      navigate("/scanner");
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-cyan-100 px-4">
      <div className="w-full max-w-md bg-[#0d1117] p-8 rounded-2xl border border-cyan-400 shadow-2xl bg-opacity-90 z-10">
        <h2 className="text-3xl font-bold text-center text-cyan-300 mb-6 tracking-wide">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full p-3 bg-[#0b0f1a] text-cyan-200 border border-cyan-500 rounded focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full p-3 bg-[#0b0f1a] text-cyan-200 border border-cyan-500 rounded focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-400 to-pink-500 hover:from-pink-500 hover:to-cyan-400 text-black font-bold py-2 px-4 rounded transition-all duration-300 shadow-lg"
          >
            Login
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-400 text-center font-semibold">
            ❌ {error}
          </div>
        )}

        {success && (
          <div className="mt-4 text-green-400 text-center font-semibold">
            ✅ {success}
          </div>
        )}
      </div>
    </div>
  );
}
