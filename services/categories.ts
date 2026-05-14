import { Category } from '@/app/generated/prisma/client'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => '/api/category',
    }),
  }),
})

export const { useGetCategoriesQuery } = categoriesApi
