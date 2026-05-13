'use client'

import ProductCatalogCard from '@/components/product-catalog-card'
import Loading from '@/components/loading'
import { useGetBookmarksQuery } from '@/services/bookmarks'

export default function BookmarksPage() {
  const { data: bookmarks = [], isLoading } = useGetBookmarksQuery()

  if (isLoading) return <Loading />

  return (
    <div className="w-full pt-5 md:px-4">
      <h2 className="mb-5 px-2 text-xl font-semibold text-primary md:text-2xl">Сохраненные товары</h2>

      <div className="mt-7 grid grid-cols-2 gap-x-1 gap-y-15 md:grid-cols-4 lg:grid-cols-4">
        {bookmarks.length === 0 ? (
          <p>Нет сохранённых товаров</p>
        ) : (
          bookmarks.map((product) => <ProductCatalogCard key={product.slug} product={product} />)
        )}
      </div>
    </div>
  )
}
