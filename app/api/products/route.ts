// import { Prisma } from '@/app/generated/prisma/client'
// import prisma from '@/lib/prisma'
// import { NextRequest, NextResponse } from 'next/server'

// export async function GET(req: NextRequest) {
//     try {
//         const { searchParams } = new URL(req.url)

//         const category = searchParams.get('category')
//         const color = searchParams.get('color')
//         const priceSort = searchParams.get('price')

//         const colors = color?.split(',').filter(Boolean) || []

//         const where: Prisma.ProductWhereInput = {
//             ...(category && {
//                 category: { slug: category },
//             }),
//             ...(colors &&
//                 colors.length > 0 && {
//                     color: {
//                         name: {
//                             in: colors,
//                         },
//                     },
//                 }),
//         }

//         const orderBy: Prisma.ProductOrderByWithRelationInput | undefined =
//             priceSort === 'price_asc' ? { price: 'asc' } : priceSort === 'price_desc' ? { price: 'desc' } : undefined

//         const products = await prisma.product.findMany({
//             where,
//             orderBy,
//             take: 12,
//             select: {
//                 id: true,
//                 name: true,
//                 slug: true,
//                 price: true,
//                 oldPrice: true,
//                 category: {
//                     select: {
//                         name: true,
//                         slug: true,
//                     },
//                 },
//                 color: {
//                     select: {
//                         name: true,
//                         hex: true,
//                     },
//                 },
//                 images: {
//                     select: {
//                         url: true,
//                     },
//                     orderBy: {
//                         position: 'asc',
//                     },
//                 },
//             },
//         })

//         const formattedProducts = products.map((product) => ({
//             ...product,
//             images: product.images.map((img) => img.url),
//         }))

//         return NextResponse.json(formattedProducts)
//     } catch (error) {
//         console.error('Error fetching products:', error)
//         return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
//     }
// }
