import ProductCatalogCard from '@/components/product-catalog-card'
import BreadCrumbs from '@/components/breadcrumbs'
import FilterColor from '@/components/Filters/filter-color'
import FilterPrice from '@/components/Filters/price-filter'
import getCatalogProducts from '@/lib/actions/get-catalog-products'
import { getCategory } from '@/lib/actions/get-category'

export default async function ProductCatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ color?: string; price?: 'price_asc' | 'price_desc' }>
}) {
  const { slug } = await params
  const { color, price } = await searchParams

  const categoryData = await getCategory(slug)

  const products = await getCatalogProducts(slug, color, price)
  console.log(products, 'это продукты')

  return (
    <div className="w-full px-2 pt-5 md:px-4">
      <div className="mb-5">
        <BreadCrumbs items={[{ label: 'Главная', href: '/' }]} />
      </div>
      <h2 className="text-xl font-semibold text-primary md:text-2xl">{categoryData?.name}</h2>
      <div className="mt-5 flex gap-2 md:gap-4">
        <FilterColor products={products} />
        <FilterPrice />
      </div>
      <div className="mt-7 grid grid-cols-2 gap-x-1 gap-y-15 md:grid-cols-4 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCatalogCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
