import React from 'react';
import checkupImg from '../../assets/vetService1.png';
import vaccinationImg from '../../assets/vetService2.png';
import groomingImg from '../../assets/vetService3.png';

const Services = () => {
  const services = [
    {
      title: 'Checkups',
      description: 'Comprehensive health checkups for your pets.',
      image: checkupImg,
    },
    {
      title: 'Vaccination',
      description: 'Protect your pets with our vaccination services.',
      image: vaccinationImg,
    },
    {
      title: 'Grooming',
      description: 'Keep your pets looking great with our grooming services.',
      image: groomingImg,
    },
  ];

  return (
    <div className="">
      <h1 className="text-3xl font-extrabold text-[#17252A] mb-12 ">
        Vet Services
      </h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-xl group transform transition duration-300 hover:scale-105"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-80 object-cover"

            />

            {/* Title bar */}
            <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-[#17252A]/90 to-white/10 px-4 py-2 z-20">
              <h2 className="text-white text-xl font-semibold">{service.title}</h2>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 flex justify-center items-center bg-black/70 backdrop-blur-sm text-white px-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="flex flex-col items-center gap-4">
                <p className="text-base">{service.description}</p>
                <button className="bg-white text-[#17252A] font-medium px-4 py-2 rounded-md hover:bg-gray-200 transition">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-14 block mx-auto bg-[#17252A] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#1c3b40] transition shadow-md hover:shadow-lg">
        Find a Vet
      </button>
    </div>
  );
};

export default Services;
