import prisma from '../prisma'

export default async function getProduct(slug?: string) {
  const product = await prisma.product.findUnique({
    where: {
      slug: slug,
    },

    select: {
      id: true,
      sku: true,
      name: true,
      category: true,
      slug: true,
      price: true,
      oldPrice: true,
      color: {
        select: {
          name: true,
          hex: true,
        },
      },
      images: {
        select: {
          url: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
      sizes: {
        select: {
          size: true,
          stock: true,
        },
      },
      composition: true,
      sizeOnModel: true,
      heightOnModel: true,
      country: true,
      description: true,
      delivery: true,
      refund: true,
      care: true,
    },
  })

  if (!product) return null

  return {
    ...product,
    oldPrice: product.oldPrice ?? undefined,
    images: product.images.map((img) => img.url),
  }
}
