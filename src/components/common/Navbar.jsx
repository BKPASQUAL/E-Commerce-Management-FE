import React from "react";

function Navbar({ title }) {
  return (
    <div className="flex justify-between mx-10 h-20 items-center">
      <div className="text-3xl font-bold">{title}</div>
      <div className="flex items-center">
        <div className="text-xl font-medium ml-20">Jimmy Jay</div>
      </div>
    </div>
  );
}

export default Navbar;
