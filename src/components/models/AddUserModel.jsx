import React from "react";
import { Box, Modal, TextField, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useAddUserMutation, useGetAllUsersQuery, useGetUserCountQuery } from "../../store/api/userApi";

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
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  contactNo: yup
    .string()
    .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
    .required("Contact number is required"),
  gender: yup.string().required("Gender is required"),
  address: yup.string().required("Address is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: yup.string().required("Role is required"),
});

function AddUserModel({ open, handleClose, userId, onSubmit }) {
  const [addUser] = useAddUserMutation(); 
  const {refetch:getAllUserRefetch} = useGetAllUsersQuery();
  const {refetch:getCountRefetch} = useGetUserCountQuery();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      contactNo: "",
      gender: "",
      address: "",
      username: "",
      password: "",
      role: "",
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      Swal.fire({
        title: userId ? "Updating User..." : "Adding User...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await addUser(data).unwrap();

      Swal.close();
      Swal.fire({
        icon: "success",
        title: userId ? "User updated successfully" : "User added successfully",
      });

      if (onSubmit) onSubmit(response); 
      reset(); 
      handleClose(); 
      getAllUserRefetch();
      getCountRefetch();
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error Occurred",
        text: error?.data?.message || "An error occurred. Please try again.",
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-user-modal"
      aria-describedby="add-new-user-form"
    >
      <Box sx={style}>
        <h2 className="text-center font-bold text-2xl">
          {userId ? "Edit User" : "Add New User"}
        </h2>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid grid-cols-2 gap-3 gap-y-4 mt-6">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="contactNo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contact Number"
                  fullWidth
                  error={!!errors.contactNo}
                  helperText={errors.contactNo?.message}
                />
              )}
            />
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Gender"
                  select
                  fullWidth
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  fullWidth
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            />
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Role"
                  select
                  fullWidth
                  error={!!errors.role}
                  helperText={errors.role?.message}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                </TextField>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="bg-red-700 p-2 rounded-lg w-100 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black p-2 rounded-lg w-100 text-white"
            >
              {userId ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export default AddUserModel;
