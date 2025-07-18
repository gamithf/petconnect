import NavBar from '../../components/vetService/NavBar'
import clinic1 from '../../assets/clinic1.png'
import clinic2 from '../../assets/clinic2.png'
import clinic3 from '../../assets/clinic3.png'
import loginBg from '../../assets/info1.png'
import registerBg from '../../assets/register-bg.png'
import vetService1 from '../../assets/vetService1.png'
import { useParams } from 'react-router-dom'
import AppointmentModal from '../../components/vetService/AppointmentModal'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const ClinicsInfo = () => {
    const { clinicId } = useParams();
    const clinic = clinicsData[clinicId];
    const [isModalOpen, setIsModalOpen] = useState(false);
    if (!clinic) {
        return <div className="text-white p-8">Clinic not found.</div>;
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="min-h-screen px-0 md:px-8 py-0 md:py-6 bg-gradient-to-br from-[#3AAFA9] via-[#2B7A78] to-[#17252A] relative overflow-x-hidden font-sans"
        >
            <NavBar />
            {/* Clinic Info Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="max-w-5xl mx-auto mt-12 md:mt-20 relative z-10"
            >
                <div className="relative bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                    {/* Clinic Image - overlaps card */}
                    <div className="flex-shrink-0 -mt-24 md:-mt-32 md:-ml-24 z-20">
                        <img src={clinic.image} alt={clinic.name} className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-3xl shadow-xl " />
                    </div>
                    {/* Clinic Details */}
                    <div className="flex-1 mt-6 md:mt-0">
                        <p className="text-sm text-[#2e6a67] mb-2 font-semibold tracking-wide">Home / Vet Clinics / <span className="font-bold text-[#17252A]">{clinic.name}</span></p>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#17252A] mb-4 drop-shadow-lg">{clinic.name}</h1>
                        <p className="text-[#2B7A78] mb-6 text-lg max-w-xl font-medium">{clinic.description}</p>
                        {/* Services - horizontal scrollable */}
                        <div className="flex gap-4 overflow-x-auto pb-2 mb-6">
                            {serviceList.map((service, idx) => (
                                <div key={idx} className="min-w-[110px] h-28 bg-[#2b7a77b6] backdrop-blur-md rounded-2xl shadow-md  flex flex-col items-center justify-center text-center transition-transform hover:scale-105 hover:shadow-xl cursor-pointer">
                                    <span className="text-2xl  mb-1">{service.icon}</span>
                                    <span className="text-[#ffffff] font-semibold text-sm leading-tight">{service.label}</span>
                                </div>
                            ))}
                        </div>
                        {/* Contact & Hours */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 bg-[#2b7a77b6] backdrop-blur-md rounded-2xl shadow  p-4 flex items-center gap-3">
                                <span className="text-2xl text-[#3AAFA9]">⏰</span>
                                <div>
                                    <div className="text-[#17252A] font-bold text-sm">Hours</div>
                                    <div className="text-[#ffffff] text-xs">Mon - Fri: 9am - 8pm</div>
                                </div>
                            </div>
                            <div className="flex-1 bg-[#2b7a77b6] backdrop-blur-md rounded-2xl shadow  p-4 flex items-center gap-3">
                                <span className="text-2xl text-[#3AAFA9]">📍</span>
                                <div>
                                    <div className="text-[#17252A] font-bold text-sm">Address</div>
                                    <div className="text-[#ffffff] text-xs">1234, Kottawa, Colombo</div>
                                </div>
                            </div>
                        </div>
                        {/* Book Now Button */}
                        <div className="mt-8">
                            <button 
                                className="bg-gradient-to-r from-[#17252A] to-[#2B7A78] hover:from-[#2B7A78] hover:to-[#3AAFA9] text-white font-bold px-10 py-3 rounded-full shadow-lg text-lg transition-all duration-200"
                                onClick={() => setIsModalOpen(true)}
                            >Book Appointment</button>
                        </div>
                    </div>
                </div>
            </motion.div>
            {/* Feedback Section */}
            <div className="relative z-10 mt-20 mb-12 max-w-6xl mx-auto">
                <h3 className="text-3xl font-extrabold text-[#17252A] mb-8 drop-shadow-lg text-center">User Feedback</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(clinic.feedbacks || []).map((fb, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.15 + 0.2, duration: 0.5 }}
                            className="bg-white/20 backdrop-blur-lg rounded-2xl p-7 flex flex-col items-center shadow-xl border-l-8 border-[#3AAFA9] hover:scale-105 transition-transform duration-200"
                        >
                            <img src={fb.userImage} alt={fb.userName} className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-[#3AAFA9] shadow" />
                            <div className="font-bold text-[#17252A] text-lg mb-1">{fb.userName}</div>
                            <div className="text-sm text-[#0d2525] font-semibold mb-2">{fb.title}</div>
                            <div className="mb-2 text-[#e1ff00] flex text-lg">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i}>{i < fb.rating ? '★' : '☆'}</span>
                                ))}
                            </div>
                            <div className="text-[#ffffff] text-sm font-light text-center">{fb.description}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </motion.div>
    )
}

// Service list for display
const serviceList = [
    { icon: '💉', label: 'Vaccinations' },
    { icon: '🧺', label: 'Health Checks' },
    { icon: '🦷', label: 'Dental Care' },
    { icon: '🏥', label: 'Surgery' },
    { icon: '🚑', label: 'Emergency Care' },
];

// Hardcoded feedbacks for each clinic (example)
const feedbacksData = [
    [
        {
            userName: 'Alice Perera',
            userImage: clinic1,
            title: 'Pet Owner',
            description: 'Amazing service! The vets were very caring and professional.',
            rating: 5,
        },
        {
            userName: 'Nimal Silva',
            userImage: clinic2,
            title: 'Dog Lover',
            description: 'Quick appointment and thorough checkup. Highly recommend.',
            rating: 4,
        },
        {
            userName: 'Nimal Silva',
            userImage: clinic2,
            title: 'Dog Lover',
            description: 'Quick appointment and thorough checkup. Highly recommend.',
            rating: 4,
        },
    ],
    [
        {
            userName: 'Samanthi Jayasuriya',
            userImage: clinic3,
            title: 'Cat Parent',
            description: 'Friendly staff and clean environment. My cat was comfortable.',
            rating: 5,
        },
        {
            userName: 'Ruwan Fernando',
            userImage: loginBg,
            title: 'Pet Enthusiast',
            description: 'Good experience overall, but waiting time was a bit long.',
            rating: 3,
        },
        {
            userName: 'Nimal Silva',
            userImage: clinic2,
            title: 'Dog Lover',
            description: 'Quick appointment and thorough checkup. Highly recommend.',
            rating: 4,
        },
    ],
    [
        {
            userName: 'Dilani Wickramasinghe',
            userImage: registerBg,
            title: 'Rabbit Owner',
            description: 'They handled my rabbit with great care. Will visit again!',
            rating: 5,
        },
        {
            userName: 'Kasun Pathirana',
            userImage: vetService1,
            title: 'Animal Lover',
            description: 'Professional and friendly staff. Highly recommended.',
            rating: 4,
        },
        {
            userName: 'Kasun Pathirana',
            userImage: vetService1,
            title: 'Animal Lover',
            description: 'Professional and friendly staff. Highly recommended.',
            rating: 4,
        },
    ],
];

// Patch clinicsData to include feedbacks
import { clinicsData as originalClinicsData } from './Clinics';
const clinicsData = originalClinicsData.map((clinic, idx) => ({
    ...clinic,
    feedbacks: feedbacksData[idx] || [],
}));

export default ClinicsInfo