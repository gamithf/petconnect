/* eslint-disable no-unused-vars */
import { use, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

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

    if (!error && data) {
      console.log("User registered:", data.user);
      // Optional: Redirect or show success message
      navigate("/home");
    }
  };
  return (
    <>
      <div className="min-h-screen bg-[#3AAFA9] text-white">
        <div className="text-center">
          {/* <h2 className="text-xl font-semibold">Register Page</h2>
          <p>Under development</p> */}

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              name="name"
              placeholder="Name"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3AAFA9] bg-white bg-opacity-80 placeholder-gray-500 text-gray-800"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <input
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <input
              name="password"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {data && <p style={{ color: "green" }}>Registered successfully!</p>}
          </form>
        </div>
      </div>
    </>
  );
}
