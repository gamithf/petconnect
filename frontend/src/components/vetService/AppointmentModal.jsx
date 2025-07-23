import React, { useState } from 'react';

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
];

const AppointmentModal = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-[#17252A] rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-[#3AAFA9]"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-3xl font-semibold text-[#3AAFA9] text-center mb-8">Book Appointment</h2>
        <form className="space-y-6">
          {/* Date, Time, Service */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
            {/* Date Picker */}
            <div className="flex flex-col md:w-1/2">
              <label className="text-white text-sm mb-1">Date</label>
              <input
                type="date"
                className="bg-[#22313A] text-white rounded-lg px-4 py-2 focus:outline-none"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            {/* Service Dropdown */}
            <div className="flex flex-col md:w-1/2">
              <label className="text-white text-sm mb-1">Services</label>
              <select
                className="bg-[#22313A] text-white rounded-lg px-4 py-2 focus:outline-none"
                value={selectedService}
                onChange={e => setSelectedService(e.target.value)}
              >
                <option value="">Select Service</option>
                <option value="Vaccinations">Vaccinations</option>
                <option value="Health Checks">Health Checks</option>
                <option value="Dental Care">Dental Care</option>
                <option value="Surgery">Surgery</option>
                <option value="Emergency Care">Emergency Care</option>
              </select>
            </div>
          </div>
          {/* Time Slots - moved below date and services */}
          <div className="flex flex-col mb-6">
            <label className="text-white text-sm mb-1">Time</label>
            <div className="grid grid-cols-3 gap-3 mt-1">
              {timeSlots.map(slot => (
                <button
                  type="button"
                  key={slot}
                  className={`py-2 px-3 rounded-xl font-semibold border transition-all duration-150 focus:outline-none shadow-md text-base
                    ${selectedTime === slot
                      ? 'bg-[#3AAFA9] text-[#17252A] border-[#3AAFA9] ring-2 ring-[#3AAFA9]'
                      : 'bg-[#22313A] text-white border-[#2B7A78] hover:bg-[#2B7A78] hover:text-[#3AAFA9]'}
                  `}
                  onClick={() => setSelectedTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
          {/* Contact Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-2">1. Contact</h3>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-white text-sm">Email address*</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-[#22313A] text-white/20 rounded-lg px-4 py-2 mt-1 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-white text-sm">Phone number</label>
                <input
                  type="tel"
                  placeholder="+1 (415) 123-4567"
                  className="w-full bg-[#22313A] text-white/20 rounded-lg px-4 py-2 mt-1 focus:outline-none"
                />
              </div>
              <div className="flex items-center mt-1">
                <input type="checkbox" id="consent" className="mr-2" />
                <label htmlFor="consent" className="text-white text-xs">I consent to receive text messages for order updates</label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#3AAFA9] hover:bg-[#2B7A78] text-[#17252A] font-semibold py-3 rounded-xl mt-4 transition"
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal; 