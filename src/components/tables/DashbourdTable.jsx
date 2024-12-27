import React, { useState } from "react";
import { Table } from "rsuite";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../store/api/productApi";
import AddProduct from "../models/AddProduct";
import Swal from "sweetalert2";

const { Column, HeaderCell, Cell } = Table;

function DashbourdTable({ tableHeight }) {
  const {
    data: getAllProducts,
    isLoading,
    isError,
    refetch,
  } = useGetAllProductsQuery();

  const [deleteProduct] = useDeleteProductMutation();
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

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteProduct(id).unwrap();
        if (response) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: response,
            showConfirmButton: false,
            timer: 1000,
          });
          refetch();
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: response || "Something went wrong. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error Occurred",
          text:
            error?.data?.payload ||
            error.message ||
            "Unable to delete Product. Please try again later.",
        });
      }
    }
  };

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
        <Column flexGrow={2}>
          <HeaderCell className="bg-gray-200 text-gray-700">Code</HeaderCell>
          <Cell dataKey="productCode" />
        </Column>
        <Column flexGrow={3}>
          <HeaderCell className="bg-gray-200 text-gray-700">
            Product Name
          </HeaderCell>
          <Cell dataKey="productName" />
        </Column>
        {/* <Column flexGrow={3}>
          <HeaderCell className="bg-gray-200 text-gray-700">Brand</HeaderCell>
          <Cell dataKey="brand" />
        </Column> */}

        <Column flexGrow={3}>
          <HeaderCell className="bg-gray-200 text-gray-700">
            Category
          </HeaderCell>
          <Cell dataKey="category" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell className="bg-gray-200 text-gray-700">
            Quantity
          </HeaderCell>
          <Cell dataKey="quantity" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell className="bg-gray-200 text-gray-700">
            Selling Price
          </HeaderCell>
          <Cell dataKey="sellingPrice" />
        </Column>

        {/* <Column flexGrow={1}>
          <HeaderCell>Action</HeaderCell>
          <Cell>
            {(rowData) => (
              <>
                <span
                  className="material-symbols-outlined sidebar-icon text-lg font-medium text-txtdarkblue mr-3 cursor-pointer text-blue-500"
                  onClick={() => handleEditItem(rowData)}
                >
                  edit
                </span>
                <span
                  className="material-symbols-outlined sidebar-icon text-lg font-medium text-red mr-3 cursor-pointer text-red-500	"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(rowData._id);
                  }}
                >
                  delete
                </span>
              </>
            )}
          </Cell>
        </Column> */}
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

export default DashbourdTable;
