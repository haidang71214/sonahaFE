// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../constant/constant";

// bannerApi.js
export const bannerApi = createApi({
  reducerPath: "bannerApi", // Đặt tên cho reducer của bannerApi
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllBanners: builder.query<any, any>({
      query: () => "/Banner/getAllBanner",
    }),
  }),
});

// Xuất hook cho endpoint getAllBanners
export const { useGetAllBannersQuery } = bannerApi;
