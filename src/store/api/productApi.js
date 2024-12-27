import api from "./api";

export const productApi = api.injectEndpoints({
  reducerPath: "productApi",
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (formData) => ({
        url: "products",
        method: "POST",
        body: formData,
      }),
    }),

    getAllProducts: builder.query({
      query: () => "products",
    }),
  }),
});

export const { useAddProductMutation, useGetAllProductsQuery } =
  productApi;
