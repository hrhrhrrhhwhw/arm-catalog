import { configureStore } from '@reduxjs/toolkit'
import { categoriesApi } from '@/services/categories'
import { setupListeners } from '@reduxjs/toolkit/query'
import { bookmarksApi } from '@/services/bookmarks'
import { cartApi } from '@/services/cart'

export const store = configureStore({
  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [bookmarksApi.reducerPath]: bookmarksApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoriesApi.middleware).concat(bookmarksApi.middleware).concat(cartApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
