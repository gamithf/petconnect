import React, { useState } from "react";
import bg0 from "../../assets/ai-services/bg0.png";
import bg from "../../assets/ai-services/bg.png";

function PetForm() {
  const [petType, setPetType] = useState("");
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [neutered, setNeutered] = useState("");
  const [weight, setWeight] = useState("");

  const handleReset = () => {
    setPetType("");
    setName("");
    setBreed("");
    setAge("");
    setGender("");
    setNeutered("");
    setWeight("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!petType || !name || !breed || !age || !gender || !neutered || !weight) {
      alert("Please fill in all fields.");
      return;
    }

    const petData = { petType, name, breed, age, gender, neutered, weight };
    console.log("Pet info submitted:", petData);
    alert("Thank you! Your pet information has been saved.");
    handleReset();
  };

  return (
    <div className="min-h-screen bg-[#2b7a78] font-sans flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-xl">
        {/* Image Section */}
        <div className="lg:w-1/2 bg-[#2b7a78] flex items-center justify-center p-8">
          <div className="relative w-full h-full max-h-[600px]">
            <img
              src={bg0}
              alt="Background Layer"
              className="absolute w-full h-full object-contain z-0"
            />
            <img
              src={bg}
              alt="Foreground Layer"
              className="relative w-full h-full object-contain z-10"
            />
          </div>
        </div>

        {/* Form Section - Now properly centered */}
        <div className="lg:w-1/2 p-8 md:p-12 bg-[#c0f3f0] flex items-center justify-center">
          <form
            className="w-full max-w-md space-y-6"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold text-center text-[#2b7a78]">
              Give Pawli the basic information about your pet for better care
            </h2>

            {/* Row 1 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block font-semibold mb-2 text-[#2b7a78]">Pet Type</label>
                <select
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                  className="w-full border border-[#2b7a78] p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#2b7a78]"
                  required
                >
                  <option value="">Select pet type</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block font-semibold mb-2 text-[#2b7a78]">Name for Record</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your pet's name"
                  className="w-full border border-[#2b7a78] p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#2b7a78]"
                  required
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block font-semibold mb-2 text-[#2b7a78]">Breed</label>
                <input
                  type="text"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  placeholder="Enter breed"
                  className="w-full border border-[#2b7a78] p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#2b7a78]"
                  required
                />
              </div>

              <div className="flex-1">
                <label className="block font-semibold mb-2 text-[#2b7a78]">Age (years)</label>
                <input
                  type="number"
                  min="0"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter age"
                  className="w-full border border-[#2b7a78] p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#2b7a78]"
                  required
                />
              </div>
            </div>

            {/* Row 3 - Gender and Neutered */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block font-semibold mb-2 text-[#2b7a78]">Gender</label>
                <div className="flex gap-4">
                  {["Female", "Male"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      className={`px-4 py-2 rounded-full border-2 ${
                        gender === g
                          ? "bg-[#2b7a78] text-white border-[#2b7a78]"
                          : "bg-white text-[#2b7a78] border-[#2b7a78] hover:bg-[#e0f7f5]"
                      } transition-colors`}
                      onClick={() => setGender(g)}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <label className="block font-semibold mb-2 text-[#2b7a78]">Neutered?</label>
                <div className="flex gap-4">
                  {["Yes", "No"].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`px-4 py-2 rounded-full border-2 ${
                        neutered === n
                          ? "bg-[#2b7a78] text-white border-[#2b7a78]"
                          : "bg-white text-[#2b7a78] border-[#2b7a78] hover:bg-[#e0f7f5]"
                      } transition-colors`}
                      onClick={() => setNeutered(n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 4 - Weight */}
            <div>
              <label className="block font-semibold mb-2 text-[#2b7a78]">Weight</label>
              <div className="flex flex-wrap gap-4">
                {["0-25 lbs", "25-50 lbs", "50-100 lbs", "100+ lbs"].map((range) => (
                  <button
                    key={range}
                    type="button"
                    className={`px-4 py-2 rounded-full border-2 ${
                      weight === range
                        ? "bg-[#2b7a78] text-white border-[#2b7a78]"
                        : "bg-white text-[#2b7a78] border-[#2b7a78] hover:bg-[#e0f7f5]"
                    } transition-colors`}
                    onClick={() => setWeight(range)}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md transition-colors"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                type="submit"
                className="bg-[#2b7a78] hover:bg-[#1a5a58] text-white px-6 py-2 rounded-md transition-colors"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PetForm;