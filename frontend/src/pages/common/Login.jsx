/* eslint-disable no-unused-vars */
import { FiUser, FiLock, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import loginbg from "../../assets/loginBg.jpg";
import { Link, useNavigate } from "react-router-dom";

import { authRequest } from "../../api/api";
import React, { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const payload = { email, password };
      const response = await authRequest("/users/login", "POST", payload);
      const data = response.data;

      if (data.status === "success") navigate("/home");
      else {
        setError(response.data?.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during login."
      );
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const popup = window.open(
      "http://localhost:3000/auth/google",
      "_blank",
      "width=500,height=600"
    );

    window.addEventListener("message", (event) => {
      if (event.origin === "http://localhost:3000") {
        const { data } = event.data;
        // Handle user data and token
        console.log("Google auth success:", data);
        if (data && data.token) {
          // Store token in local storage or state management
          localStorage.setItem("auth_token", data.token);
          // Redirect to home page
          navigate("/home");
        } else {
          setError("Google authentication failed. Please try again.");
        }
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3AAFA9] p-4">
      {/* Card with background image */}
      <div
        className="w-full max-w-md rounded-lg shadow-md overflow-hidden relative"
        style={{
          backgroundImage: `url(${loginbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Semi-transparent overlay - lighter for dark text */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/30"></div>

        {/* Content with dark text */}
        <div className="relative z-10 p-8 text-gray-800">
          {/* Logo Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mt-24">
              Welcome Back Pet Lover !
            </h1>
          </div>

          {error && (
            <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-500" />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3AAFA9] bg-white bg-opacity-80 placeholder-gray-500 text-gray-800"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-500" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3AAFA9] bg-white bg-opacity-80 placeholder-gray-500 text-gray-800"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#3AAFA9] focus:ring-[#3AAFA9] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-800"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-gray-800 hover:text-[#2E8B84]"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#3AAFA9] hover:bg-[#2E8B84] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3AAFA9] disabled:opacity-70"
            >
              {isLoading ? "Logging in..." : "Log in"}{" "}
              <FiArrowRight className="ml-2" />
            </button>

            {/* Divider with "or" text */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Google Sign-In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3AAFA9]"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              Continue with Google
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-[#3AAFA9] hover:text-[#2E8B84]"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
