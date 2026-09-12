import { baseApi } from "./BaseApi";

export type TStats = {
  totalProperty?: number;
  totalAgent?: number;
  totalUser?: number;
  totalReview?: number;
  [key: string]: any;
};

export const allStatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStats: builder.query<TStats, string>({
      query: () => "allStats",
      providesTags: ["Stats"],
    }),
  }),
});

export const { useGetAllStatsQuery } = allStatsApi;
