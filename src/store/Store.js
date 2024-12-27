import { configureStore } from "@reduxjs/toolkit";
import api from "./api/api";
import { productApi } from "./api/productApi";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, productApi.middleware),
});
