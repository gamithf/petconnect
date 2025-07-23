/* eslint-disable no-unused-vars */
import { use, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import loginbg from "../../assets/loginBg.jpg";
import { FiLock, FiMail, FiUser } from "react-icons/fi";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { data, error, loading, sendRequest } = useAxios({
    method: "POST",
    url: "http://localhost:5000/api/auth/signup",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest({
      data: formData,
    });

    if (formData.name && formData.email && formData.password) {
      // Reset form data after successful registration
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
    navigate("/home");

    // if (!error && data) {
    //   console.log("User registered:", data.user);
    //   // Optional: Redirect or show success message
    //   navigate("/home");
    // }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#3AAFA9] p-4">
        {/* <h2 className="text-xl font-semibold">Register Page</h2>
          <p>Under development</p> */}

        <div
          className="w-full max-w-md rounded-lg shadow-md overflow-hidden relative"
          style={{
            backgroundImage: `url(${loginbg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative z-10 p-8 text-gray-800">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mt-24">Register Pet Lover !</h1>
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
                    name="name"
                    placeholder="Name"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3AAFA9] bg-white bg-opacity-80 placeholder-gray-500 text-gray-800"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-500" />
                  </div>
                  <input
                    name="email"
                    placeholder="Email"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3AAFA9] bg-white bg-opacity-80 placeholder-gray-500 text-gray-800"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-500" />
                  </div>
                  <input
                    name="password"
                    placeholder="Password"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3AAFA9] bg-white bg-opacity-80 placeholder-gray-500 text-gray-800"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#17252A] text-white justify-center align-center px-4 py-2 rounded-md hover:opacity-90 transition text-sm cursor-pointer w-24 sm:w-24"
                >
                  {loading ? "Registering..." : "Register"}
                </button>

                {data && (
                  <p style={{ color: "green" }}>Registered successfully!</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
