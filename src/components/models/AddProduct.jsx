import React, { useEffect } from "react";
import { Box, Modal, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import * as yup from "yup";
import {
  useAddProductMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../store/api/productApi";
import "bootstrap/dist/css/bootstrap.min.css";

const style = {
  position: "absolute",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const schema = yup.object().shape({
  productCode: yup.string().required("Product Code is required"),
  productName: yup.string().required("Product Name is required"),
  brand: yup.string().required("Brand is required"),
  category: yup.string().required("Category is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required"),
  sellingPrice: yup
    .number()
    .typeError("Selling Price must be a number")
    .required("Selling Price is required"),
  description: yup.string().nullable(),
});

function AddProduct({ open, handleClose, productId }) {
  const { data: getDataById } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });
  const { refetch: getAllProductRefetch } = useGetAllProductsQuery(undefined, {
    skip: false, // Ensure the query always starts
  });
  
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      productCode: "",
      productName: "",
      brand: "",
      category: "",
      quantity: "",
      sellingPrice: "",
      description: "",
    },
  });

  useEffect(() => {
    if (getDataById?.product) {
      reset({
        productCode: getDataById.product.productCode || "",
        productName: getDataById.product.productName || "",
        brand: getDataById.product.brand || "",
        category: getDataById.product.category || "",
        quantity: getDataById.product.quantity || "",
        sellingPrice: getDataById.product.sellingPrice || "",
        description: getDataById.product.description || "",
      });
    }
  }, [getDataById, reset]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
    
  });
  
  const safeRefetch = () => {
    if (!isLoading && !isError && getAllProductRefetch) {
      getAllProductRefetch();
    }
  };

  const onAddProduct = async (data) => {
    try {
      handleClose();
      Swal.fire({
        title: "Adding Product...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await addProduct(data).unwrap();
      if (response?.message === "Product added successfully") {
        Swal.close();
        Toast.fire({
          icon: "success",
          title: response.message,
        });
        getAllProductRefetch();
      } else {
        throw new Error(response?.message || "Unexpected response format.");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.close();
      const errorMessage = error?.data?.message || error?.message || "An error occurred. Please try again.";
      Swal.fire({
        icon: "error",
        title: "Error Occurred",
        text: errorMessage,
      });
    }
  };

  const onUpdateProduct = async (data) => {
    try {
      handleClose();
      Swal.fire({
        title: "Updating Product...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await updateProduct({ id: productId, formData: data }).unwrap();
      if (response?.message === "Product updated successfully") {
        Swal.close();
        Toast.fire({
          icon: "success",
          title: response.message,
        });
      } else {
        throw new Error(response?.message || "Unexpected response format.");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.close();
      const errorMessage = error?.data?.message || error?.message || "An error occurred. Please try again.";
      Swal.fire({
        icon: "error",
        title: "Error Occurred",
        text: errorMessage,
      });
    }
  };

  const onSubmit = (data) => {
    if (productId) {
      onUpdateProduct(data);
    } else {
      onAddProduct(data);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-product-modal"
      aria-describedby="add-new-product-form"
    >
      <Box sx={style}>
        <h2 className="text-center font-bold text-2xl">
          {productId ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-3 gap-y-4 mt-6">
            <Controller
              name="productCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Product Code"
                  fullWidth
                  error={!!errors.productCode}
                  helperText={errors.productCode?.message}
                />
              )}
            />
            <Controller
              name="productName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Product Name"
                  fullWidth
                  error={!!errors.productName}
                  helperText={errors.productName?.message}
                />
              )}
            />
            <Controller
              name="brand"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Brand"
                  fullWidth
                  error={!!errors.brand}
                  helperText={errors.brand?.message}
                />
              )}
            />
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Category"
                  fullWidth
                  error={!!errors.category}
                  helperText={errors.category?.message}
                />
              )}
            />
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Quantity"
                  fullWidth
                  error={!!errors.quantity}
                  helperText={errors.quantity?.message}
                />
              )}
            />
            <Controller
              name="sellingPrice"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Selling Price"
                  fullWidth
                  error={!!errors.sellingPrice}
                  helperText={errors.sellingPrice?.message}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-1 mt-4">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              onClick={handleClose}
              disabled={isAdding || isUpdating}
              className="btn btn-danger w-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAdding || isUpdating}
              className={`btn ${isAdding || isUpdating ? "btn-secondary" : "btn-dark"} w-100`}
            >
              {isAdding || isUpdating ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export default AddProduct;
