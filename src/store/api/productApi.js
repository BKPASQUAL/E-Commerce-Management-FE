import api from "./api";

export const productApi = api.injectEndpoints({
  reducerPath: "productApi",
  endpoints: (builder) => ({
    // Add a product
    addProduct: builder.mutation({
      query: (formData) => ({
        url: "products",
        method: "POST",
        body: formData,
      }),
    }),

    // Get all products (lazy query support)
    getAllProducts: builder.query({
      query: () => "products",
    }),

    // Get a product by ID (lazy query support)
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),

    // Delete a product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
    }),

    // Update a product
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery, 
  useLazyGetProductByIdQuery, 
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
