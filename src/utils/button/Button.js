import React from "react";

function Button({ children, onClick }) {
  return (
    <>
      <button
        className="bg-[#FF922B] p-1 rounded text-sm font-medium"
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}

export default Button;
