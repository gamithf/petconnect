import React from 'react'
import { motion } from 'framer-motion'
import NavBar from '../../components/vetService/NavBar';
import Services1 from '../../components/vetService/Services';


export default function VetService() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-[#3AAFA9] min-h-screen px-8 py-6"
    >
      <NavBar />
      <Services1 />
      {/* HI */}
    </motion.div>
  );
}
