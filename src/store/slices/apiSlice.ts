import type { User } from "@/types/user";
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { router } from "@/routes";

const BaseQuery = fetchBaseQuery({
  baseUrl: "https://precious-dusk-a6e2c9.netlify.app/.netlify/functions/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWith403check = async (
  arguments_: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  const result = await BaseQuery(arguments_, api, extraOptions);

  if (result.error && result.error.status === 403) {
    localStorage.clear();
    router.navigate("/login", { replace: true });
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWith403check,
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
    blockUsers: builder.mutation<void, { ids: number[] }>({
      query: (body) => ({
        url: "/users/block",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    unblockUsers: builder.mutation<void, { ids: number[] }>({
      query: (body) => ({
        url: "/users/unblock",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUsers: builder.mutation<void, { ids: number[] }>({
      query: (body) => ({
        url: "/users/delete",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUsersQuery,
  useBlockUsersMutation,
  useUnblockUsersMutation,
  useDeleteUsersMutation,
} = apiSlice;
