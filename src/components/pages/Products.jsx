import React, { useState, useEffect } from "react";
import ProductsTable from "../tables/ProductsTable";
import Navbar from "../common/Navbar";
import { Input, InputGroup, InputPicker } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import AddProduct from "../models/AddProduct";
import { useGetProductCountQuery } from "../../store/api/productApi";

function Products() {
  const [tableHeight, setTableHeight] = useState(700);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: productCount } = useGetProductCountQuery();

  const categoryOptions = [
    { label: "All", value: "" },
    { label: "Electronics", value: "Electronics" },
    { label: "Clothing", value: "Clothing" },
    { label: "Groceries", value: "Groceries" },
    // Add more categories as needed
  ];

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

  const handleOpenAddProduct = () => {
    setIsAddProductOpen(true);
  };

  const handleCloseAddProduct = () => {
    setIsAddProductOpen(false);
  };

  return (
    <>
      <Navbar title="Products" count={productCount?.count || 0} />
      <div className="px-4 md:px-10">
        <div className="flex flex-col md:flex-row md:justify-between mb-12 space-y-4 md:space-y-0">
          {/* Search Input */}
          <div className="w-full md:w-auto">
            <InputGroup inside style={{ width: "500px" }} size="lg">
              <Input
                placeholder="Search Products By Name or Brand ..."
                value={searchTerm}
                onChange={(value) => setSearchTerm(value)}
              />
              <InputGroup.Button>
                <SearchIcon />
              </InputGroup.Button>
            </InputGroup>
          </div>

          {/* Category Picker and Add Button */}
          <div className="flex flex-col md:flex-row md:items-center w-full md:w-auto space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-auto">
              <InputPicker
                style={{ width: "100%", maxWidth: "250px" }}
                size="lg"
                placeholder="Select Category"
                data={categoryOptions}
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
              />
            </div>

            <button
              className="bg-black text-white p-2 pl-4 pr-6 rounded flex items-center w-full md:w-auto "
              onClick={handleOpenAddProduct}
            >
              <span className="material-symbols-outlined addcar-crossicon mr-1">
                add
              </span>
              Add Product
            </button>
          </div>
        </div>
        <ProductsTable
          tableHeight={tableHeight}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
        />
      </div>
      <AddProduct open={isAddProductOpen} handleClose={handleCloseAddProduct} />
    </>
  );
}

export default Products;
