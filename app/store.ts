// store.js
import { configureStore } from "@reduxjs/toolkit";
import { propertiesApi } from "@/service/properties"; // Import propertiesApi từ service/properties
import { bannerApi } from "@/service/Banner"; // Import bannerApi từ service/bannerApi

export const store = configureStore({
  reducer: {
    [propertiesApi.reducerPath]: propertiesApi.reducer, // Thêm propertiesApi vào reducer
    [bannerApi.reducerPath]: bannerApi.reducer, // Thêm bannerApi vào reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(propertiesApi.middleware, bannerApi.middleware), // Thêm middleware của cả propertiesApi và bannerApi
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
