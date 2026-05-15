import { createToken, getToken } from '@/lib/actions/get-create-token'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  let token = await getToken()

  if (!token) {
    token = await createToken()
  }

  const cart = await prisma.cart.findUnique({
    where: { token },

    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,

              images: {
                take: 1,
                select: {
                  url: true,
                },
              },
              price: true,
              sizes: {
                select: {
                  size: true,
                  stock: true,
                },
              },
            },
          },
        },
      },
    },
  })

  return NextResponse.json(
    cart?.items.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      slug: item.product.slug,
      price: item.product.price,
      image: item.product.images[0]?.url || '',
      quantity: item.quantity,
      size: item.size,
      stock: item.product.sizes.find((s) => s.size === item.size)?.stock || 0,
    })) ?? []
  )
}

export async function POST(req: Request) {
  try {
    const { productId, size } = await req.json()

    if (!productId || !size) {
      return NextResponse.json({ error: 'productId и size обязательны' }, { status: 400 })
    }

    let token = await getToken()

    if (!token) {
      token = await createToken()
    }

    const cart = await prisma.cart.upsert({
      where: { token },
      create: { token },
      update: {},
    })

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId_size: {
          cartId: cart.id,
          productId,
          size,
        },
      },
    })

    if (existingItem) {
      await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },

        data: {
          quantity: {
            increment: 1,
          },
        },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          size,
          quantity: 1,
        },
      })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: 'Ошибка добавления товара' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const { productId, size, type } = await req.json()

    let token = await getToken()

    if (!token) {
      token = await createToken()
    }

    const cart = await prisma.cart.findUnique({
      where: { token },
    })

    if (!cart) {
      return NextResponse.json({ error: 'Корзина не найдена' }, { status: 404 })
    }

    const item = await prisma.cartItem.findUnique({
      where: {
        cartId_productId_size: {
          cartId: cart.id,
          productId,
          size,
        },
      },
    })

    if (!item) {
      return NextResponse.json({ error: 'Товар не найден' }, { status: 404 })
    }

    if (type === 'increment') {
      await prisma.cartItem.update({
        where: {
          id: item.id,
        },

        data: {
          quantity: {
            increment: 1,
          },
        },
      })
    }

    if (type === 'decrement') {
      if (item.quantity <= 1) {
        await prisma.cartItem.delete({
          where: {
            id: item.id,
          },
        })
      } else {
        await prisma.cartItem.update({
          where: {
            id: item.id,
          },

          data: {
            quantity: {
              decrement: 1,
            },
          },
        })
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: 'Ошибка изменения количества' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { productId, size } = await req.json()

    if (!productId || !size) {
      return NextResponse.json({ error: 'productId и size обязательны' }, { status: 400 })
    }

    let token = await getToken()

    if (!token) {
      token = await createToken()
    }

    const cart = await prisma.cart.findUnique({
      where: { token },
    })

    if (!cart) {
      return NextResponse.json({ error: 'Корзина не найдена' }, { status: 404 })
    }

    await prisma.cartItem.delete({
      where: {
        cartId_productId_size: {
          cartId: cart.id,
          productId,
          size,
        },
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: 'Ошибка удаления товара' }, { status: 500 })
  }
}
