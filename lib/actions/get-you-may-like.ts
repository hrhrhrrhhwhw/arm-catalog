import prisma from '@/lib/prisma'

export default async function getYouMayLike(categorySlug: string, productId: number) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: categorySlug,
      },
      NOT: {
        id: productId,
      },
    },
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      category: {
        select: {
          slug: true,
          name: true,
        },
      },
      name: true,
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
      },
    },
  })

  return products.map((p:any) => ({
    ...p,
    images: p.images.map((img:any) => img.url),
  }))
}
