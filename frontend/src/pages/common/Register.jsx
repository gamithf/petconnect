import { useState } from "react";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import loginbg from "../../assets/loginBg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../../api/api";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      const response = await apiRequest("/users/register", "POST", payload);
      const data = response.data;

      if (data.status === "success") navigate("/home");
      else {
        setError(data?.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during registration.");
      console.error("Registration error:", err);
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
        if (data && data.token) {
          localStorage.setItem("auth_token", data.token);
          navigate("/home");
        } else {
          setError("Google authentication failed. Please try again.");
        }
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3AAFA9] p-4">
      <div
        className="w-full max-w-md rounded-lg shadow-md overflow-hidden relative"
        style={{
          backgroundImage: `url(${loginbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/30"></div>

        <div className="relative z-10 p-8 text-gray-800">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mt-24">Join Pet Lovers Today!</h1>
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
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3AAFA9] bg-white bg-opacity-80 placeholder-gray-500 text-gray-800"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3AAFA9] bg-white bg-opacity-80 placeholder-gray-500 text-gray-800"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-500" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3AAFA9] bg-white bg-opacity-80 placeholder-gray-500 text-gray-800"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#3AAFA9] hover:bg-[#2E8B84] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3AAFA9] disabled:opacity-70"
            >
              {isLoading ? "Registering..." : "Register"}{" "}
              <FiArrowRight className="ml-2" />
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 font-bold">or</span>
              </div>
            </div>

            {/* Google Sign-In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3AAFA9]"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              Sign up with Google
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 font-bold">
            Already have an account?{" "}
            <Link
              to="/login"
              className="inline-block px-4 py-2 bg-[#3AAFA9] text-white font-medium rounded-lg shadow hover:bg-[#2E8B84] transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
