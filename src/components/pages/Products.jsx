import React from "react";
import ProductsTable from "../tables/ProductsTable";
import Navbar from "../common/Navbar";
import { Input, InputGroup, InputPicker } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

function Products() {
  return (
    <>
      <Navbar title="Products" />
      <div className="px-4 md:px-10">
        <div className="flex flex-col md:flex-row md:justify-between mb-12 space-y-4 md:space-y-0">
          {/* Search Input */}
          <div className="w-full md:w-auto">
            <InputGroup inside style={{ width: "100%", maxWidth: "500px" }} size="mg">
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
                size="mg"
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
        <ProductsTable />
      </div>
    </>
  );
}

export default Products;
