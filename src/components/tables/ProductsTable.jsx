import React, { useState } from "react";
import { Table } from "rsuite";
import { useGetAllProductsQuery } from "../../store/api/productApi";
import AddProduct from "../models/AddProduct";

const { Column, HeaderCell, Cell } = Table;

function ProductsTable({ tableHeight }) {
  const { data: getAllProducts, isLoading, isError } = useGetAllProductsQuery();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null); 

  const products = getAllProducts?.product || [];

  const handleEditItem = (product) => {
    setSelectedProductId(product._id); 
    setIsEditOpen(true); 
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false); 
    setSelectedProductId(null); 
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load products.</div>;
  }

  return (
    <div>
      <Table
        height={tableHeight}
        data={products}
        onRowClick={(rowData) => {
          console.log(rowData);
        }}
        style={{ width: "100%" }}
      >
        <Column flexGrow={2} align="center">
          <HeaderCell className="bg-gray-200 text-gray-700">Code</HeaderCell>
          <Cell dataKey="productCode" />
        </Column>
        <Column flexGrow={3}>
          <HeaderCell className="bg-gray-200 text-gray-700">
            Product Name
          </HeaderCell>
          <Cell dataKey="productName" />
        </Column>
        <Column flexGrow={3}>
          <HeaderCell className="bg-gray-200 text-gray-700">Brand</HeaderCell>
          <Cell dataKey="brand" />
        </Column>

        <Column flexGrow={3}>
          <HeaderCell className="bg-gray-200 text-gray-700">Category</HeaderCell>
          <Cell dataKey="categoryId" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell className="bg-gray-200 text-gray-700">Quantity</HeaderCell>
          <Cell dataKey="quantity" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell className="bg-gray-200 text-gray-700">Selling Price</HeaderCell>
          <Cell dataKey="sellingPrice" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Action</HeaderCell>
          <Cell>
            {(rowData) => (
              <>
                <span
                  className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue mr-3 cursor-pointer"
                  onClick={() => handleEditItem(rowData)}
                >
                  edit
                </span>
                <span
                  className="material-symbols-outlined sidebar-icon text-lg font-medium text-red mr-3 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteOpen(rowData._id);
                  }}
                >
                  delete
                </span>
              </>
            )}
          </Cell>
        </Column>
      </Table>

      {isEditOpen && (
        <AddProduct
          open={isEditOpen}
          handleClose={handleCloseEdit}
          productId={selectedProductId} 
        />
      )}
    </div>
  );
}

export default ProductsTable;
