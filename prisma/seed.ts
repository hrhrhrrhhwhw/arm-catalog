import { products, colors, categories } from '@/app/constants'
import { PrismaClient, Size } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'
import slugify from 'slugify'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
})

async function main() {
  console.log('Очищаем таблицу')
  await prisma.$executeRawUnsafe(`
        TRUNCATE TABLE
            "ProductSize",
            "CartItem",
            "OrderItem",
            "BookmarkItem",
            "Cart",
            "Order",
            "Bookmark",
            "Payment",
            "Image",
            "Product",
            "Category",
            "Color"
        RESTART IDENTITY CASCADE;
    `)

  //цвета
  console.log('Создаем цвета')
  await prisma.color.createMany({
    data: colors.map((c) => ({
      name: c.name,
      hex: c.hex,
    })),
  })
  console.log('Цвета созданы')

  //категории
  console.log('Создаем категории')
  await prisma.category.createMany({
    data: categories.map((c) => ({
      name: c.name,
      slug: c.slug,
    })),
  })
  console.log('Категории созданы')

  const allCategories = await prisma.category.findMany()
  const categoryMap = new Map(allCategories.map((c) => [c.slug, c.id]))

  const allColors = await prisma.color.findMany()
  const colorMap = new Map(allColors.map((c) => [c.name, c.id]))

  console.log('Создаем товары')
  for (const p of products) {
    const colorId = colorMap.get(p.color.name)
    const categoryId = categoryMap.get(p.category)

    if (!colorId) {
      throw new Error(`Color not found: ${p.color.name}`)
    }
    if (!categoryId) {
      throw new Error(`Category not found: ${p.category}`)
    }

    await prisma.product.create({
      data: {
        sku: p.sku,
        name: p.name,
        slug: slugify(`${p.name}-${p.sku}`, { lower: true, strict: true }),

        category: {
          connect: { id: categoryId },
        },

        price: p.price,
        oldPrice: p.oldPrice ?? null,

        color: {
          connect: { id: colorId },
        },

        images: {
          create: p.images.map((url, i) => ({
            url,
            position: i,
          })),
        },

        sizes: {
          create: p.sizes.map((s) => ({
            size: Size[s.size as keyof typeof Size],
            stock: s.stock,
          })),
        },

        composition: p.composition ?? null,
        sizeOnModel: p.sizeOnModel ?? null,
        heightOnModel: p.heightOnModel ?? null,
        country: p.country ?? null,
        description: p.description ?? null,
        delivery: p.delivery ?? null,
        refund: p.refund ?? null,
        care: p.care ?? null,
      },
    })
    console.log('создан:', p.name)
  }
}
main()
  .then(() => console.log('✅ все создалось, гратц'))
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
