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

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContact: builder.query<TPaginatedResponse<LoginInputs>, Record<string, any> | string | void>({
      query: (args) => {
        if (!args) return "contact";
        if (typeof args === "string") return `contact${args ? (args.startsWith("?") ? args : `?${args}`) : ""}`;
        const params = new URLSearchParams();
        Object.entries(args).forEach(([key, val]) => {
          if (val !== undefined && val !== null && val !== "") {
            params.append(key, String(val));
          }
        });
        const queryString = params.toString();
        return queryString ? `contact?${queryString}` : "contact";
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
      providesTags: ["Contact"],
    }),
    getSingleContact: builder.query<LoginInputs, string | null>({
      query: (id) => `contact/${id}`,
      transformResponse: (response: any) => response?.data || response,
      providesTags: ["Contact"],
    }),
    createContact: builder.mutation<LoginInputs, Partial<LoginInputs>>({
      query: (body) => ({
        url: "contact",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Contact"],
    }),
    deleteContact: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useGetContactQuery,
  useGetSingleContactQuery,
  useCreateContactMutation,
  useCreateContactMutation: usePostContactMutation,
  useDeleteContactMutation,
} = contactApi;
