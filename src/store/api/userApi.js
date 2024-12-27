import api from "./api";

export const userApi = api.injectEndpoints({
  reducerPath: "userApi",
  endpoints: (builder) => ({
    // Add a user
    addUser: builder.mutation({
      query: (formData) => ({
        url: "users",
        method: "POST",
        body: formData,
      }),
    }),

    // Get all users
    getAllUsers: builder.query({
      query: () => "users",
    }),

    deleteUser: builder.mutation({
        query: (userId) => ({
          url: `users/${userId}`,
          method: "DELETE",
        }),
      }),
  }),
});

export const {
  useAddUserMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,

} = userApi;
