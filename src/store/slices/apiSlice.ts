import type { User } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://precious-dusk-a6e2c9.netlify.app/.netlify/functions/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Users"],
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
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetUsersQuery } =
  apiSlice;
