import React, { useState } from "react";

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
    <div className="flex h-screen bg-[#2b7a78] font-sans">
      {/* Image Section */}
      <div className="flex-1 relative hidden lg:flex items-center justify-center">
        <img
          src="/bg0.png"
          alt="Background Layer"
          className="absolute w-[900px] h-[740px] z-0"
        />
        <img
          src="/bg.png"
          alt="Foreground Layer"
          className="w-[900px] h-[740px] z-10"
        />
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 bg-[#c0f3f0]">
        <form
          className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-2xl space-y-6 border border-[#2b7a78]"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center text-[#2b7a78]">
            Give Pawli the basic information about your pet for better care
          </h2>

          {/* Row 1 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block font-semibold mb-2">Pet Type</label>
              <select
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
                className="w-full border border-[#2b7a78] p-2 rounded-md bg-[#c0f3f0] focus:outline-none"
              >
                <option value="">Select pet type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block font-semibold mb-2">Name for Record</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your pet's name"
                className="w-full border border-[#2b7a78] p-2 rounded-md bg-[#c0f3f0] focus:outline-none"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block font-semibold mb-2">Breed</label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="Enter breed"
                className="w-full border border-[#2b7a78] p-2 rounded-md bg-[#c0f3f0] focus:outline-none"
              />
            </div>

            <div className="flex-1">
              <label className="block font-semibold mb-2">Age (years)</label>
              <input
                type="number"
                min="0"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                className="w-full border border-[#2b7a78] p-2 rounded-md bg-[#c0f3f0] focus:outline-none"
              />
            </div>
          </div>

          {/* Row 3 - Gender and Neutered */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block font-semibold mb-2">Gender</label>
              <div className="flex gap-4">
                {["Female", "Male"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    className={`px-4 py-2 rounded-full border-2 ${
                      gender === g
                        ? "bg-[#2b7a78] text-white border-[#2b7a78]"
                        : "bg-[#c0f3f0] text-[#2b7a78] border-[#2b7a78]"
                    }`}
                    onClick={() => setGender(g)}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <label className="block font-semibold mb-2">Neutered?</label>
              <div className="flex gap-4">
                {["Yes", "No"].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`px-4 py-2 rounded-full border-2 ${
                      neutered === n
                        ? "bg-[#2b7a78] text-white border-[#2b7a78]"
                        : "bg-[#c0f3f0] text-[#2b7a78] border-[#2b7a78]"
                    }`}
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
            <label className="block font-semibold mb-2">Weight</label>
            <div className="flex flex-wrap gap-4">
              {["0-25 lbs", "25-50 lbs", "50-100 lbs", "100+ lbs"].map((range) => (
                <button
                  key={range}
                  type="button"
                  className={`px-4 py-2 rounded-full border-2 ${
                    weight === range
                      ? "bg-[#2b7a78] text-white border-[#2b7a78]"
                      : "bg-[#c0f3f0] text-[#2b7a78] border-[#2b7a78]"
                  }`}
                  onClick={() => setWeight(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-[#2b7a78] hover:bg-[#246f6d] text-white px-6 py-2 rounded-md"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PetForm;
