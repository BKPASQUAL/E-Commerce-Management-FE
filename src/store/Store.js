import { configureStore } from "@reduxjs/toolkit";
import api from "./api/api";
import { productApi } from "./api/productApi";
import { authApi } from "./api/authApi";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
      productApi.middleware,
      authApi.middleware
    ),
});
