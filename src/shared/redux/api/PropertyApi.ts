import { baseApi } from "./BaseApi";
import { TPropertyTypes } from "../../types/types";

export interface TPaginatedResponse<T> extends Array<T> {
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const propertyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProperty: builder.query<TPaginatedResponse<TPropertyTypes>, Record<string, any> | string | void>({
      query: (args) => {
        if (!args) return "property";
        if (typeof args === "string") return `property${args ? (args.startsWith("?") ? args : `?${args}`) : ""}`;
        const params = new URLSearchParams();
        Object.entries(args).forEach(([key, val]) => {
          if (val !== undefined && val !== null && val !== "") {
            params.append(key, String(val));
          }
        });
        const queryString = params.toString();
        return queryString ? `property?${queryString}` : "property";
      },
      transformResponse: (response: any): TPaginatedResponse<TPropertyTypes> => {
        if (response && Array.isArray(response.data)) {
          const items = [...response.data] as TPaginatedResponse<TPropertyTypes>;
          items.meta = response.meta;
          return items;
        }
        if (Array.isArray(response)) {
          return [...response] as TPaginatedResponse<TPropertyTypes>;
        }
        return [] as unknown as TPaginatedResponse<TPropertyTypes>;
      },
      providesTags: ["Property"],
    }),
    getSingleProperty: builder.query<TPropertyTypes, string | null>({
      query: (id) => `property/${id}`,
      transformResponse: (response: any) => response?.data || response,
      providesTags: ["Property"],
    }),
    createProperty: builder.mutation<TPropertyTypes, Partial<TPropertyTypes>>({
      query: (body) => ({
        url: "property",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Property"],
    }),
    updateProperty: builder.mutation<
      TPropertyTypes,
      { id: string; body: Partial<TPropertyTypes> }
    >({
      query: ({ id, body }) => ({
        url: `property/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Property"],
    }),
    deleteProperty: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `property/${id}`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: ["Property"],
    }),
  }),
});

export const {
  useGetPropertyQuery,
  useGetSinglePropertyQuery,
  useCreatePropertyMutation,
  useCreatePropertyMutation: usePostPropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} = propertyApi;
