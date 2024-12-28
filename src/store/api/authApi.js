import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:3000/",
    baseUrl: 'https://e-commerce-management-be-production.up.railway.app/',
  }),
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (data) => {
        return {
          url: "users/login",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
