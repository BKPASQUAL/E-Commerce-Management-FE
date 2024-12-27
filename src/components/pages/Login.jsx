import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FiMail, FiLock } from "react-icons/fi";
import { useLoginUserMutation } from "../../store/api/authApi";

function Login() {
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser(data).unwrap();
      if (response && response.token) {
        localStorage.setItem("accessToken", response.token);
        reset();
        navigate("/home");
        setErrorMessage(null);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Welcome to Cook!",
        });
      } else {
        setErrorMessage(
          response?.error?.data?.message ||
            response?.error?.data?.errors[0]?.msg ||
            "Login failed"
        );
      }
    } catch (error) {
      console.error("Login Error", error);
      setErrorMessage("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Welcome Back!
        </h2>
        <p className="text-lg font-medium text-gray-500 mb-8 text-center">
          Please login to your account
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <FiMail className="absolute top-3.5 left-3 text-gray-400" size={20} />
            <TextField
              id="email"
              label="Email Address"
              variant="outlined"
              fullWidth
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: <div className="pl-10" />,
              }}
            />
          </div>
          <div className="relative">
            <FiLock className="absolute top-3.5 left-3 text-gray-400" size={20} />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: <div className="pl-10" />,
              }}
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-lg"
            }`}
          >
            {loading ? "Signing In..." : "SIGN IN"}
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-6">
          Don't have an account?{" "}
          <span
            className="text-indigo-600 font-semibold "
          >
            Pleace Contact Admin
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
