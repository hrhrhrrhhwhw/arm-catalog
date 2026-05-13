import { Categories } from '@/lib/types/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getCategories: builder.query<Categories, void>({
      query: () => '/api/category',
      keepUnusedDataFor: 300,
      providesTags: ['Category'],
    }),
  }),
})

export const { useGetCategoriesQuery } = categoriesApi
