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

    // Get all users Count
    getUserCount: builder.query({
        query: () => "users/userCount",
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
  useGetUserCountQuery ,
  useDeleteUserMutation,

} = userApi;
