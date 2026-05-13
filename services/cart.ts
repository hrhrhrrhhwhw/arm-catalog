import { CartItem } from '@/lib/types/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type CartResponse = CartItem[]

export const cartApi = createApi({
  reducerPath: 'cartApi',

  baseQuery: fetchBaseQuery({
    baseUrl: '',
    credentials: 'include',
  }),

  tagTypes: ['Cart'],

  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => '/api/cart',
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation<
      void,
      {
        product: {
          id: number
          name: string
          slug: string
          price: number
          oldPrice: number | null
          image: string
          color: {
            hex: string
          }
        }
        size: string
      }
    >({
      query: ({ product, size }) => ({
        url: '/api/cart',
        method: 'POST',
        body: {
          productId: product.id,
          size,
        },
      }),

      async onQueryStarted({ product, size }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData('getCart', undefined, (draft) => {
            const existingItem = draft.find((item) => item.id === product.id && item.size === size)

            if (existingItem) {
              existingItem.quantity += 1
            } else {
              draft.push({
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                oldPrice: product.oldPrice,
                image: product.image,
                color: product.color,
                quantity: 1,
                size,
              })
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: ['Cart'],
    }),
    incrementItem: builder.mutation<void, { productId: number; size: string }>({
      query: ({ productId, size }) => ({
        url: '/api/cart',
        method: 'PATCH',
        body: {
          productId,
          size,
          type: 'increment',
        },
      }),

      async onQueryStarted({ productId, size }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData('getCart', undefined, (draft) => {
            const item = draft.find((i) => i.id === productId && i.size === size)

            if (item) {
              item.quantity += 1
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
    decrementItem: builder.mutation<void, { productId: number; size: string }>({
      query: ({ productId, size }) => ({
        url: '/api/cart',
        method: 'PATCH',
        body: {
          productId,
          size,
          type: 'decrement',
        },
      }),

      async onQueryStarted({ productId, size }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData('getCart', undefined, (draft) => {
            const item = draft.find((i) => i.id === productId && i.size === size)

            if (!item) return

            if (item.quantity > 1) {
              item.quantity -= 1
            } else {
              return draft.filter((i) => !(i.id === productId && i.size === size))
            }
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
    removeItem: builder.mutation<void, { productId: number; size: string }>({
      query: ({ productId, size }) => ({
        url: '/api/cart',
        method: 'DELETE',
        body: {
          productId,
          size,
        },
      }),
      async onQueryStarted({ productId, size }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData('getCart', undefined, (draft) => {
            return draft.filter((item) => !(item.id === productId && item.size === size))
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
})

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useIncrementItemMutation,
  useDecrementItemMutation,
  useRemoveItemMutation,
} = cartApi
