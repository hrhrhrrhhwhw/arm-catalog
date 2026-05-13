import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { createToken, getToken } from '@/lib/actions/get-create-token'

export async function GET() {
  let token = await getToken()

  if (!token) {
    token = await createToken()
  }

  const bookmark = await prisma.bookmark.findUnique({
    where: { token },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              color: true,
              images: true,
              category: true,
              price: true,
              oldPrice: true,
            },
          },
        },
      },
    },
  })

  return NextResponse.json(
    bookmark?.items.map((i) => ({
      ...i.product,
      images: i.product.images.map((img) => img.url),
    })) ?? []
  )
}

export async function POST(req: NextRequest) {
  try {
    let token = await getToken()

    if (!token) {
      token = await createToken()
    }

    const { productId } = await req.json()

    let bookmark = await prisma.bookmark.findUnique({
      where: { token },
    })

    if (!bookmark) {
      bookmark = await prisma.bookmark.create({
        data: { token },
      })
    }

    const existing = await prisma.bookmarkItem.findUnique({
      where: {
        bookmarkId_productId: {
          bookmarkId: bookmark.id,
          productId,
        },
      },
    })

    if (existing) {
      await prisma.bookmarkItem.delete({
        where: { id: existing.id },
      })
    } else {
      await prisma.bookmarkItem.create({
        data: {
          bookmarkId: bookmark.id,
          productId,
        },
      })
    }

    const bookmarkItems = await prisma.bookmarkItem.findMany({
      where: { bookmarkId: bookmark.id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true,
            images: true,
            category: true,
            price: true,
            oldPrice: true,
          },
        },
      },
    })

    const items = bookmarkItems.map((item) => ({
      ...item.product,
      images: item.product.images.map((img) => img.url),
    }))

    return NextResponse.json(items)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
