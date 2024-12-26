import React, { useState, useEffect } from "react";
import ProductsTable from "../tables/ProductsTable";
import Navbar from "../common/Navbar";
import { Input, InputGroup, InputPicker } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

function Users() {
   const [tableHeight, setTableHeight] = useState(700);
  
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
          setTableHeight(550);
        } else {
          setTableHeight(700);
        }
      };
  
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
  return (
    
    <>
      <Navbar title="Users" />
      <div className="px-4 md:px-10">
        <div className="flex flex-col md:flex-row md:justify-between mb-12 space-y-4 md:space-y-0">
          {/* Search Input */}
          <div className="w-full md:w-auto">
            <InputGroup inside style={{ width: "500px" }} size="lg">
              <Input placeholder="Search Products By Name or Brand ..." />
              <InputGroup.Button>
                <SearchIcon />
              </InputGroup.Button>
            </InputGroup>
          </div>

          {/* Brand Picker and Add Button */}
          <div className="flex flex-col md:flex-row md:items-center w-full md:w-auto space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-auto">
              <InputPicker
                style={{ width: "100%", maxWidth: "250px" }}
                size="lg"
                placeholder="Select Brand"
              />
            </div>

            <button className="bg-black text-white p-2 pl-4 pr-6 rounded flex items-center w-full md:w-auto">
              <span className="material-symbols-outlined addcar-crossicon mr-1">
                add
              </span>
              Add Vehicle
            </button>
          </div>
        </div>
        <ProductsTable tableHeight={tableHeight} />
        </div>
    </>
  );
}

export default Users;
