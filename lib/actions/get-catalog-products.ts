import { cache } from 'react'
import prisma from '../prisma'
import { ProductCard } from '../types'

type SortPrice = 'price_asc' | 'price_desc'

export const getCatalogProducts = cache(async (category?: string, color?: string, price?: SortPrice) => {
  const colors = color?.split(',').filter(Boolean)

  const products = await prisma.product.findMany({
    where: {
      ...(category && {
        category: {
          slug: category,
        },
      }),
      ...(colors &&
        colors.length > 0 && {
          color: {
            name: {
              in: colors,
            },
          },
        }),
    },

    orderBy: price
      ? {
          price: price === 'price_asc' ? 'asc' : 'desc',
        }
      : undefined,

    take: 10,

    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      oldPrice: true,

      category: {
        select: {
          name: true,
          slug: true,
        },
      },

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
    },
  })

  const mappedProducts: ProductCard[] = products.map((p:any) => ({
    ...p,
    images: p.images.map((img: { url: string }) => img.url),
  }))

  return mappedProducts
})

export default getCatalogProducts
