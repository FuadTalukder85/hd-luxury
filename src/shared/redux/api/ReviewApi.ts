import { baseApi } from "./BaseApi";
import { TReview } from "../../types/types";

export interface TPaginatedResponse<T> extends Array<T> {
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReview: builder.query<TPaginatedResponse<TReview>, Record<string, any> | string | void>({
      query: (args) => {
        if (!args) return "reviews";
        if (typeof args === "string") return `reviews${args ? (args.startsWith("?") ? args : `?${args}`) : ""}`;
        const params = new URLSearchParams();
        Object.entries(args).forEach(([key, val]) => {
          if (val !== undefined && val !== null && val !== "") {
            params.append(key, String(val));
          }
        });
        const queryString = params.toString();
        return queryString ? `reviews?${queryString}` : "reviews";
      },
      transformResponse: (response: any): TPaginatedResponse<TReview> => {
        if (response && Array.isArray(response.data)) {
          const items = [...response.data] as TPaginatedResponse<TReview>;
          items.meta = response.meta;
          return items;
        }
        if (Array.isArray(response)) {
          return [...response] as TPaginatedResponse<TReview>;
        }
        return [] as unknown as TPaginatedResponse<TReview>;
      },
      providesTags: ["Review"],
    }),
    createReview: builder.mutation<TReview, Partial<TReview>>({
      query: (body) => ({
        url: "reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useGetReviewQuery,
  useCreateReviewMutation,
  useCreateReviewMutation: usePostReviewMutation,
} = reviewApi;
