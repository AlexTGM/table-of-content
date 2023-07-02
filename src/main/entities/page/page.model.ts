import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PageResponse } from "./page.types";

export const PageApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  keepUnusedDataFor: process.env.NODE_ENV === 'test' ? 0 : 60,
  endpoints: (build) => ({
    getPages: build.query<PageResponse, void>({
      query: () => "combined",
    }),
  }),
});

export const { useGetPagesQuery } = PageApi;
