// import { ProductCard } from '@/lib/types/types'
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// interface GetProductsParams {
//     category?: string
//     color?: string
//     sort?: 'price_asc' | 'price_desc'
//     take?: number
// }

// export const productApi = createApi({
//     reducerPath: 'productApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: '',
//         credentials: 'include',
//     }),
//     tagTypes: ['Products'],
//     endpoints: (builder) => ({
//         getProducts: builder.query<ProductCard[], GetProductsParams>({
//             query: (params) => ({
//                 url: '/products',
//                 params: {
//                     category: params.category,
//                     color: params.color,
//                     price: params.sort,
//                 },
//             }),
//         }),
//         getProductBySlug: builder.query<ProductCard, number>({
//             query: (slug) => `/products/${slug}`,
//             providesTags: (result, error, slug) => [{ type: 'Products', slug }],
//         }),
//     }),
// })

// export const { useGetProductsQuery, useGetProductBySlugQuery } = productApi
