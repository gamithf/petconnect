import React, { useState } from 'react'
import { motion } from 'framer-motion'
import NavBar from '../../components/vetService/NavBar'
import clinic1 from '../../assets/clinic1.png'
import clinic2 from '../../assets/clinic2.png'
import clinic3 from '../../assets/clinic3.png'
import { useNavigate } from 'react-router-dom'
import AppointmentModal from '../../components/vetService/AppointmentModal'

export const clinicsData = [
    {
        name: 'Happy Paws Clinic',
        description: 'Providing quality care for your furry friends.',
        type: 'Clinic',
        price: 50,
        image: clinic1,
    },
    {
        name: 'Pet Wellness Center',
        description: 'Your pet\'s health is our top priority.',
        type: 'Clinic',
        price: 40,
        image: clinic2,
    },
    {
        name: 'Animal Care Hospital',
        description: 'Comprehensive healthcare for pets.',
        type: 'Clinic',
        price: 45,
        image: clinic3,
    },

    {
        name: 'Happy Paws Clinic',
        description: 'Providing quality care for your furry friends.',
        type: 'Clinic',
        price: 50,
        image: clinic1,
    },
    {
        name: 'Pet Wellness Center',
        description: 'Your pet\'s health is our top priority.',
        type: 'Clinic',
        price: 40,
        image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
    },
    {
        name: 'Animal Care Hospital',
        description: 'Comprehensive healthcare for pets.',
        type: 'Clinic',
        price: 45,
        image: 'https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg',
    },
]

const Clinics = () => {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const clinicsPerPage = 4
    const totalPages = 5
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)
    const [selectedClinic, setSelectedClinic] = useState(null)

    // Filtered and paginated clinics
    const filteredClinics = clinicsData.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    const clinicsToShow = filteredClinics.slice((page - 1) * clinicsPerPage, page * clinicsPerPage)

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="min-h-screen px-8 py-6 bg-gradient-to-br from-[#3AAFA9] via-[#2B7A78] to-[#17252A]"
        >
            <NavBar />
            <div className="max-w-7xl mx-auto mt-4">
                <h1 className="text-4xl font-bold tracking-wide text-[#17252A] mb-8 drop-shadow-lg">Vet Clinics Near You</h1>
                <div className="flex items-center gap-4 mb-10">
                    <div className="relative flex-1 max-w-md">
                        <span className="absolute left-3 top-2.5 text-gray-300">
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white/30 backdrop-blur-md text-[#17252A] placeholder:text-gray-500 focus:outline-none text-sm shadow-md transition-all duration-200 border border-white/40"
                        />
                    </div>
                    <button className="flex text-sm items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md text-[#17252A] rounded-2xl shadow-md border border-white/40 hover:bg-[#3AAFA9]/80 transition-all duration-200">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
                        Filter
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {clinicsToShow.map((clinic, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 + 0.2, duration: 0.5 }}
                            className="flex h-40 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/40 group"
                        >
                            <img src={clinic.image} alt={clinic.name} className="w-40 h-full object-cover rounded-l-3xl" />
                            <div className="flex-1 p-6 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <h2 className="text-xl font-bold text-[#17252A]  transition-colors duration-200">{clinic.name}</h2>
                                        <span className="text-gray-700 text-xs font-semibold bg-white/60 px-3 py-1 rounded-full shadow border border-white/40">Consultation ${clinic.price}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-3 font-light">{clinic.description}</p>
                                </div>
                                <div className="flex gap-3 mt-4">
                                    <button
                                        className="text-xs flex items-center gap-2 bg-gradient-to-r bg-[#17252A] text-white px-5 py-2 rounded-2xl font-semibold shadow transition-all duration-200"
                                        onClick={() => {
                                            setSelectedClinic(clinic)
                                            setShowModal(true)
                                        }}
                                    >
                                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14m7-7H5" /></svg>
                                        Book Now
                                    </button>
                                    <button
                                        className="text-xs border-1 rounded-2xl text-[#3AAFA9] px-5 py-2 font-semibold  hover:bg-[#3AAFA9] hover:text-white transition-all duration-200"
                                        onClick={() => navigate(`/clinics/${(page - 1) * clinicsPerPage + idx}`)}
                                    >
                                        More Info
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {/* Pagination */}
                <div className="flex justify-center items-center gap-3 mt-12">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-base font-bold transition-all duration-200 border-2 border-[#2B7A78] shadow-sm ${page === i + 1 ? 'bg-[#2B7A78] text-white scale-110' : 'bg-white/40 text-[#2B7A78] hover:bg-[#3AAFA9] hover:text-white'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage(page < totalPages ? page + 1 : page)}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-[#2B7A78] text-white ml-2 hover:bg-[#20505a] shadow-lg transition-all duration-200"
                    >
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                </div>
            </div>
            <AppointmentModal
                isOpen={showModal}
                clinic={selectedClinic}
                onClose={() => setShowModal(false)}
            />
        </motion.div>
    )
}

export default Clinics