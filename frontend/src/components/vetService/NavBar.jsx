import React from 'react'
import logo from '../../assets/logoTransparent.png';

const NavBar = () => {
    return (
        <div className="flex justify-between items-center mb-6">
            <img src={logo} alt="Logo" width="100" />
            <ul className="flex gap-6 text-white">
                <li className="cursor-pointer hover:underline">About</li>
                <li className="cursor-pointer hover:underline">Features</li>
                <li className="cursor-pointer hover:underline">Pricing</li>
                <li className="cursor-pointer hover:underline">Gallery</li>
                <li className="cursor-pointer hover:underline">Team</li>
            </ul>

            <div className='flex gap-2'>
                <button className='bg-[#17252A] text-[#feffff] px-5 py-3 rounded-2xl flex items-center gap-2 text-sm font-medium hover:opacity-90 transition'>Login</button>
                <button className='bg-[#17252A] text-[#feffff] px-5 py-3 rounded-2xl flex items-center gap-2 text-sm font-medium hover:opacity-90 transition'>Register</button>
            </div>
        </div>
    )
}

export default NavBar