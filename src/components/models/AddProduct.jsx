import React, { useEffect } from "react";
import { Box, CircularProgress, Modal, TextField } from "@mui/material";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import * as yup from "yup";
import {
  useAddProductMutation,
  useUpdateProductMutation,
  useLazyGetProductByIdQuery,
  useLazyGetAllProductsQuery,
  useLazyGetMinimumQuantityQuery,
  useGetProductCountQuery,
  useGetProductByIdQuery,
} from "../../store/api/productApi";

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
  const categoryOptions = ["Electronics", "Clothing", "Books", "Furniture"];
  const brandOptions = ["Samsung", "Apple", "Nike", "Adidas"];
  const {
    data: fetchProductDataById,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId, {
    skip: !productId, 
  });
  const [fetchProductById, { data: getDataById }] =
    useLazyGetProductByIdQuery();
  const [fetchAllProducts] = useLazyGetAllProductsQuery();
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [fetchMinimumQty] = useLazyGetMinimumQuantityQuery();
  const { refetch: productCountRefeych } = useGetProductCountQuery();

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
    if (productId) {
      fetchProductById(productId);
    }
  }, [productId, fetchProductById]);

  useEffect(() => {
    if (fetchProductDataById?.product) {
      reset({
        productCode: fetchProductDataById.product.productCode || "",
        productName: fetchProductDataById.product.productName || "",
        brand: fetchProductDataById.product.brand || "",
        category: fetchProductDataById.product.category || "",
        quantity: fetchProductDataById.product.quantity || "",
        sellingPrice: fetchProductDataById.product.sellingPrice || "",
        description: fetchProductDataById.product.description || "",
      });
    }
  }, [fetchProductDataById, reset]);

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
        reset();
        fetchMinimumQty();
        fetchAllProducts();
        productCountRefeych();
      } else {
        throw new Error(response?.message || "Unexpected response format.");
      }
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error Occurred",
        text: error.message || "An error occurred. Please try again.",
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

      const response = await updateProduct({
        id: productId,
        formData: data,
      }).unwrap();
      if (response?.message === "Product updated successfully") {
        Swal.close();
        Toast.fire({
          icon: "success",
          title: response.message,
        });
        fetchMinimumQty();
        fetchAllProducts();
      } else {
        throw new Error(response?.message || "Unexpected response format.");
      }
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error Occurred",
        text: error.message || "An error occurred. Please try again.",
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

  if (isLoading) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className="flex justify-center items-center h-96">
          <CircularProgress />
        </Box>
      </Modal>
    );
  }

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
                <FormControl fullWidth error={!!errors.brand}>
                  <InputLabel>Brand</InputLabel>
                  <Select {...field} label="Brand">
                    {brandOptions.map((brand, index) => (
                      <MenuItem key={index} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                  </Select>
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {errors.brand?.message}
                  </p>
                </FormControl>
              )}
            />
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.category}>
                  <InputLabel>Category</InputLabel>
                  <Select {...field} label="Category">
                    {categoryOptions.map((category, index) => (
                      <MenuItem key={index} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {errors.category?.message}
                  </p>
                </FormControl>
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
              className="bg-red-700 p-2 rounded-lg w-100 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAdding || isUpdating}
              className="bg-black p-2 rounded-lg w-100 text-white"
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
