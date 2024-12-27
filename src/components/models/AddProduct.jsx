import React from "react";
import { Box, Modal, TextField, Divider } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddProductMutation } from "../../store/api/productApi";

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
  code: yup.string().required("Product Code is required"),
  name: yup.string().required("Product Name is required"),
  brand: yup.string().required("Brand is required"),
  category: yup.string().required("Category is required"),
  mrp: yup
    .number()
    .typeError("MRP must be a number")
    .required("MRP is required"),
  sellingPrice: yup
    .number()
    .typeError("Selling Price must be a number")
    .required("Selling Price is required"),
});

function AddProduct({ open, handleClose }) {
  const [addProduct, { isLoading, isError, isSuccess }] =
    useAddProductMutation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      code: "",
      name: "",
      brand: "",
      category: "",
      mrp: "",
      sellingPrice: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await addProduct(data).unwrap();
      console.log("Product added successfully:", result);
      reset(); // Reset form only on success
      handleClose();
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2 className="text-center font-bold text-2xl">Add New Product</h2>
        <Divider className="p-2" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-3 gap-y-4 mt-6">
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Product Code"
                  fullWidth
                  error={!!errors.code}
                  helperText={errors.code?.message}
                />
              )}
            />
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Product Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
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
              name="mrp"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="MRP"
                  fullWidth
                  error={!!errors.mrp}
                  helperText={errors.mrp?.message}
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
              type="button"
              onClick={handleClose}
              className="bg-red-500 text-white text-center h-10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-black text-white text-center"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
        {isError && <p className="text-red-500">Failed to add product.</p>}
        {isSuccess && (
          <p className="text-green-500">Product added successfully.</p>
        )}
      </Box>
    </Modal>
  );
}

export default AddProduct;
