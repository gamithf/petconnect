import NavBar from '../../components/vetService/NavBar'
import clinic1 from '../../assets/clinic1.png'
import clinic2 from '../../assets/clinic2.png'
import clinic3 from '../../assets/clinic3.png'
import loginBg from '../../assets/info1.png'
import { useParams } from 'react-router-dom'
import { clinicsData } from './Clinics'
import AppointmentModal from '../../components/vetService/AppointmentModal'
import React, { useState } from 'react'

const ClinicsInfo = () => {
    const { clinicId } = useParams();
    const clinic = clinicsData[clinicId];
    const [isModalOpen, setIsModalOpen] = useState(false);
    if (!clinic) {
        return <div className="text-white p-8">Clinic not found.</div>;
    }
    return (
        <div className="min-h-screen px-8 py-6 bg-gradient-to-br from-[#3AAFA9] via-[#2B7A78] to-[#17252A] relative overflow-hidden">
            <NavBar />
            {/* Top Section */}
            <div className="pt-8 pb-0 md:pb-8 md:flex md:justify-between md:items-start z-10 relative px-6 rounded-lg">
                {/* Left Section */}
                <div className="md:w-3/4">
                    <p className="text-sm text-white mb-2">Home / Vet Clinics / <span className="font-semibold">{clinic.name}</span></p>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#17252A] mb-4">{clinic.name}</h1>
                    <p className="text-white mb-4 max-w-md">{clinic.description}</p>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-white text-sm mb-4">
                        <span className="flex items-center gap-2">💉 Vaccinations</span>
                        <span className="flex items-center gap-2">🧺 Health Checks</span>
                        <span className="flex items-center gap-2">🦷 Dental Care</span>
                        <span className="flex items-center gap-2">🏥 Surgery</span>
                        <span className="flex items-center gap-2">🚑 Emergency Care</span>
                    </div>

                    <div className="text-white text-sm">
                        <p>Mon - Fri: 9am - 8pm</p>
                        <p>1234, Kottawa, Colombo</p>
                    </div>
                </div>

                {/* Right Section - Images */}
                <div className="md:w-3/4 flex gap-2 mt-6 md:mt-0">
                    <div className="flex flex-col gap-2">
                        <img src={clinic.image} alt={clinic.name} className="w-104 h-108 object-cover rounded-xl shadow-lg " />
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative z-10 flex flex-col  md:flex-row items-center justify-between pt-24 md:pt-40 pb-8 md:pb-0">
                <div className="md:w-1/2 mb-8 md:mb-0 px-2">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Your pet deserves<br className='text-[#17252A]' />the best care.</h2>
                    <p className="text-white mb-6 text-lg">Book an appointment with our expert veterinarians today.</p>
                    <button 
                        className="bg-[#17252A] hover:bg-[#2B7A78] text-white font-semibold px-8 py-3 rounded-full shadow-lg transition"
                        onClick={() => setIsModalOpen(true)}
                    >Book Now</button>
                </div>
                <div className="md:w-1/2 flex justify-end px-2">
                    <img src={clinic.image} alt="Vet with pet" className="w-[450px] h-[450px] object-cover " />
                </div>
            </div>
            <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}

export default ClinicsInfo