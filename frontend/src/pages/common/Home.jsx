import info from "../../assets/info1.png";

export default function Home() {
  return (
    <div className="bg-[#3AAFA9] ">
      {/* Main content container centered with 80% width */}
      <div className="w-[80%] mx-auto">
        <div className="flex flex-row justify-between items-center">
          {/* Text Section */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome to PetConnect</h1>
            <p className="text-slate-700 text-xl">
              Everything for your beloved pets in one place.
            </p>
          </div>

          {/* Image Section */}
          <div>
            <img
              src={info}
              alt="Information about PetConnect"
              className="w-2xl h-auto object-contain"
            />
          </div>
        </div>

        <div>
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
}
