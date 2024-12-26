import React from "react";
import ProductsTable from "../tables/ProductsTable";
import Navbar from "../common/Navbar";
import { Input, InputGroup, InputPicker } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

function Products() {
  return (
    <>
      <Navbar title="Products" />
      <div className="pl-10 pr-10 ">
        <div className="flex flex-row justify-between mb-12">
          <div>
            <InputGroup inside style={{ width: "500px" }} size="mg">
              <Input placeholder="Search Products By Name or Brand ..." />
              <InputGroup.Button>
                <SearchIcon />
              </InputGroup.Button>
            </InputGroup>
          </div>
          <div className="flex">
            <InputPicker
              style={{ width: 250, marginRight: "60px" }}
              size="mg"
              placeholder="Select Brand"
            />
            <button className="bg-black text-white p-2 pl-4 pr-6 rounded flex">
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
