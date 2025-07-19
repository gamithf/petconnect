import info from "../../assets/info1.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#3AAFA9] text-[#feffff] flex flex-col items-center">
      {/* Hero Section with Chatbot */}
      <section className="container mx-auto flex flex-col md:flex-row items-center justify-center py-16 px-4 gap-8">
        {/* Hero Content and Buttons (Left Column) */}
        <div className="md:w-1/2 text-center md:text-left">
          <h5 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-[#17252A]">
            Connect Better With Your Pet ...
          </h5>
          <p className="text-lg md:text-xl mb-8 text-[#17252A]">
            PetConnect is your all-in-one, AI-powered platform designed for pet owners to easily manage their pets' care.
          </p>
          <div className="flex flex-col sm:flex-col gap-4 mb-8">
            <button 
              className="bg-[#17252A] text-[#feffff] px-4 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition w-full sm:w-auto"
              onClick={() => navigate('/adoption-lost')} // Placeholder route
            >
              Adopt / Lost & Found
            </button>
            <button 
              className="bg-[#17252A] text-[#feffff] px-6 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition w-full sm:w-auto"
              onClick={() => navigate('/ai-care')} // Placeholder route
            >
              AI Pet Care
            </button>
            <button 
              className="bg-[#17252A] text-[#feffff] px-6 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition w-full sm:w-auto"
              onClick={() => navigate('/services')} // Placeholder route
            >
              Book Services
            </button>
          </div>
          {/* Add an image or illustration here */}
           <div className="w-full max-w-md h-64 bg-[#2B7A78] rounded-lg flex items-center justify-center mx-auto md:mx-0">
              <span className="text-[#feffff] text-2xl">Illustration Placeholder</span>
            </div>
        </div>

        {/* Chatbot Interface (Right Column) */}
        <div className="md:w-1/2 w-full">
           {/* <div className="mx-auto max-w-md bg-[#2B7A78] p-6 rounded-lg shadow-lg h-96 flex items-center justify-center">
              <span className="text-[#feffff] text-2xl">Chatbot Interface Placeholder</span>
            </div> */}
        </div>
      </section>

      {/* Features Overview Section (Optional - can keep or remove) */}
       {/* <section className="bg-[#2B7A78] py-16 px-4 w-full">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Why Choose PetConnect?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#3AAFA9] p-6 rounded-lg shadow-lg text-[#17252A]">
              <h3 className="text-xl font-semibold mb-4">Comprehensive Care</h3>
              <p>Manage health records, appointments, and daily routines effortlessly.</p>
            </div>
            <div className="bg-[#3AAFA9] p-6 rounded-lg shadow-lg text-[#17252A]">
              <h3 className="text-xl font-semibold mb-4">Community & Support</h3>
              <p>Connect with other pet lovers, share tips, and find local resources.</p>
            </div>
            <div className="bg-[#3AAFA9] p-6 rounded-lg shadow-lg text-[#17252A]">
              <h3 className="text-xl font-semibold mb-4">Smart Assistance</h3>
              <p>Utilize AI for health insights and personalized recommendations.</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
