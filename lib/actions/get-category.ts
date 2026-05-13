import prisma from '../prisma'

export async function getCategory(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    select: {
      name: true,
      slug: true,
    },
  })
}
