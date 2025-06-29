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
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-5 mt-10">Vet Services</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden text-center"
          >
            <img src={service.image} alt={service.title} className="w-full  object-cover rounded-lg" />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{service.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>

            </div>
          </div>
        ))}
      </div>
      <button className="block mx-auto bg-[#17252A] text-[#feffff] px-5 py-3 rounded-2xl items-center gap-2 text-l font-medium hover:opacity-90 transition mt-0">
        Find a Vet
      </button>


    </div>
  );
};

export default Services;
