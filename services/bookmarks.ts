import { ProductCard } from '@/lib/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const bookmarksApi = createApi({
  reducerPath: 'bookmarksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    credentials: 'include',
  }),
  tagTypes: ['Bookmarks'],
  endpoints: (builder) => ({
    getBookmarks: builder.query<ProductCard[], void>({
      query: () => '/api/bookmarks',
      providesTags: ['Bookmarks'],
    }),
    toggleBookmark: builder.mutation<void, ProductCard>({
      query: (product) => ({
        url: '/api/bookmarks',
        method: 'POST',
        body: { productId: product.id },
      }),

      async onQueryStarted(product, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          bookmarksApi.util.updateQueryData('getBookmarks', undefined, (draft) => {
            const index = draft.findIndex((p) => p.id === product.id)

            if (index !== -1) {
              draft.splice(index, 1)
            } else {
              draft.push(product)
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },

      invalidatesTags: ['Bookmarks'],
    }),
  }),
})

export const { useGetBookmarksQuery, useToggleBookmarkMutation } = bookmarksApi
