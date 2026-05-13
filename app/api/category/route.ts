import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')

  const categories = await prisma.category.findMany()

  let category = null

  if (slug) {
    category = await prisma.category.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    })
  }

  return NextResponse.json({
    categories,
    category,
  })
}
