import { baseApi } from "./BaseApi";
import { LoginInputs } from "../../types/types";

export interface TPaginatedResponse<T> extends Array<T> {
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<TPaginatedResponse<LoginInputs>, Record<string, any> | string | void>({
      query: (args) => {
        if (!args) return "users";
        if (typeof args === "string") return `users${args ? (args.startsWith("?") ? args : `?${args}`) : ""}`;
        const params = new URLSearchParams();
        Object.entries(args).forEach(([key, val]) => {
          if (val !== undefined && val !== null && val !== "") {
            params.append(key, String(val));
          }
        });
        const queryString = params.toString();
        return queryString ? `users?${queryString}` : "users";
      },
      transformResponse: (response: any): TPaginatedResponse<LoginInputs> => {
        if (response && Array.isArray(response.data)) {
          const items = [...response.data] as TPaginatedResponse<LoginInputs>;
          items.meta = response.meta;
          return items;
        }
        if (Array.isArray(response)) {
          return [...response] as TPaginatedResponse<LoginInputs>;
        }
        return [] as unknown as TPaginatedResponse<LoginInputs>;
      },
      providesTags: ["User"],
    }),
    getSingleUser: builder.query<LoginInputs, string | null>({
      query: (id) => `users/${id}`,
      transformResponse: (response: any) => response?.data || response,
      providesTags: ["User"],
    }),
    createUser: builder.mutation<LoginInputs, Partial<LoginInputs>>({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateUserRole: builder.mutation<
      LoginInputs,
      { id: string; role: string }
    >({
      query: ({ id, role }) => ({
        url: `user/role/${id}`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<
      LoginInputs,
      { id: string; body: Partial<LoginInputs> }
    >({
      query: ({ id, body }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetSingleUserQuery,
  useCreateUserMutation,
  useCreateUserMutation: usePostUserMutation,
  useUpdateUserRoleMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
