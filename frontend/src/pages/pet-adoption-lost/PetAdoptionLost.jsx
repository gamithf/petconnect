import { MapPin, Search, Filter, PlusCircle } from "lucide-react";
import Input from "../../components/common/Input";

export default function PetAdoptionLost() {
  return (
    <div className="bg-[#3AAFA9] min-h-screen ">
      <h2 className="text-2xl font-bold p-6">Pet Adoption/Lost</h2>
      {/* search */}
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 w-full sm:w-[300px]">
            <Search size={18} className="text-gray-500" />
            <Input
              name="search"
              placeholder="Search by name, breed..."
              className="w-full"
              onChange={() => {}}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select className="border px-3 py-1 rounded-md">
              <option value="">All Status</option>
              <option value="Adoption">Adoption</option>
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>
        </div>
      </div>

      {/* pet cards */}
      <div className=""></div>
    </div>
  );
}
