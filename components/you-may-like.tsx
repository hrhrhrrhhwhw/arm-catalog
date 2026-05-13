import ProductCatalogCard from './product-catalog-card'
import getYouMayLike from '@/lib/actions/get-you-may-like'

type YouMayLikeProps = {
  categorySlug: string
  productId: number
}

export default async function YouMayLike({ categorySlug, productId }: YouMayLikeProps) {
  const products = await getYouMayLike(categorySlug, productId)

  return (
    <div>
      <h2 className="mb-5 px-2 text-3xl text-muted-foreground">Товары, которые могут понравиться</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((p) => (
          <ProductCatalogCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
