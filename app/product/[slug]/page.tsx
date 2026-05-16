

import BreadCrumbs from '@/components/breadcrumbs'
import ProductDescription from '@/components/Product/product-description'
import ProductGallery from '@/components/Product/product-gallery'
import ProductInfo from '@/components/Product/product-info'
import YouMayLike from '@/components/you-may-like'
import getProduct from '@/lib/actions/get-product'
import { notFound } from 'next/navigation'

interface ProductProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({ params }: ProductProps) {

  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) notFound()

  return (
    <div className="md:p-4">
      <div className="mt-4 px-2">
        <BreadCrumbs items={[{ label: 'Главная', href: '/' }, { label: product.name }]} />
      </div>

      <div className="my-7 items-start gap-5 overflow-visible sm:grid-cols-[50%_50%] md:grid md:grid-cols-[65%_30%]">
        <div className="mb-5">
          <ProductGallery images={product.images} name={product.name} />
        </div>
        <div className="sticky top-24 flex flex-col gap-4 px-4">
          <ProductInfo
            id={product.id}
            name={product.name}
            slug={product.slug}
            images={product.images}
            price={product.price}
            oldPrice={product.oldPrice}
            color={product.color}
            sizes={product.sizes.map((s) => ({
              value: s.size,
              stock: s.stock,
            }))}
          />
        </div>
      </div>
      <div className="mb-10 border-b border-sidebar-ring pb-4">
        <ProductDescription
          sku={product.sku}
          composition={product.composition}
          sizeOnModel={product.sizeOnModel}
          heightOnModel={product.heightOnModel}
          country={product.country}
          description={product.description}
          delivery={product.delivery}
          refund={product.refund}
          care={product.care}
        />
      </div>
      <div className="">
        <YouMayLike categorySlug={product.category.slug} productId={product.id} />
      </div>
    </div>
  )
}
