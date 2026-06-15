import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://precious-dusk-a6e2c9.netlify.app/.netlify/functions/api",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData: { email: string; password: string }) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (userData: { email: string; password: string }) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = apiSlice;
