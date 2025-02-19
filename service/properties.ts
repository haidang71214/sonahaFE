// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../constant/constant"

// Define a service using a base URL and expected endpoints
export const propertiesApi = createApi({
  reducerPath: "getProperties",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL  }),
  endpoints: (builder) => ({
    getProperties: builder.query<any,any>({
      query: () => `proprities`,
    }),
  }), 
});

export const { useGetPropertiesQuery } = propertiesApi;
