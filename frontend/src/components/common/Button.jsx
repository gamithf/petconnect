import React from "react";
import { FiArrowRight } from "react-icons/fi";

const Button = ({ text, onClick, icon = true }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#17252A] text-[#feffff] px-3 py-4 rounded-md flex items-center gap-2 text-sm font-medium hover:opacity-90 transition cursor-pointer"
    >
      {text}
      {icon && <FiArrowRight />}
    </button>
  );
};

export default Button;
