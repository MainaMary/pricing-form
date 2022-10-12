import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "variety",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Variety"],
  endpoints: (builder) => ({
    getAllVarieties: builder.query({
      query: () => "productsVariety",
      providesTags: ["Variety"],
    }),
    addNewVariety: builder.mutation({
      query: (payload) => ({
        url: "/productsVariety",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Variety"],
    }),
  }),
});

export const { useAddNewVarietyMutation, useGetAllVarietiesQuery } = apiSlice;
