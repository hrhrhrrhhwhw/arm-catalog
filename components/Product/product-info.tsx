'use client'

import { Button } from '@/components/ui/button'
import {
  useAddToCartMutation,
  useDecrementItemMutation,
  useGetCartQuery,
  useIncrementItemMutation,
} from '@/services/cart'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

interface ProductInfoProps {
  id: number
  name: string
  slug: string
  price: number
  oldPrice: number | null
  images: string[]
  color: {
    name: string
    hex: string
  }
  sizes: {
    value: string
    stock: number
  }[]
}

export default function ProductInfo({ id, name, slug, price, oldPrice, images, color, sizes }: ProductInfoProps) {
  const { data: cart = [] } = useGetCartQuery()
  const [selectedSize, setSelectedSize] = useState(sizes[0]?.value || '')
  const [addToCart, { isLoading }] = useAddToCartMutation()

  const [incrementItem] = useIncrementItemMutation()
  const [decrementItem] = useDecrementItemMutation()

  const cartItem = cart.find((item) => item.id === id && item.size === selectedSize)

  const handleAddToCart = async () => {
    try {
      await addToCart({
        product: {
          id,
          name,
          slug,
          price,
          image: images?.[0] || '',
        },
        size: selectedSize,
      }).unwrap()

      toast('Товар добавлен в корзину', {
        position: 'top-right',
      })
    } catch (e) {
      toast('Ошибка добавления в корзину', {
        position: 'top-right',
      })

      console.error(e)
    }
  }

  return (
    <div>
      <h1 className="text-xl text-primary">{name}</h1>

      <div className="mb-5">
        <span className="text-lg">{price.toLocaleString('ru-RU')} ₽</span>

        {oldPrice != null && (
          <span className="ml-3 text-base text-muted-foreground line-through">
            {oldPrice.toLocaleString('ru-RU')} ₽
          </span>
        )}
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <div className="h-8 w-8 rounded-full" style={{ backgroundColor: color.hex }} />

        <span className="text-sm text-muted-foreground">{color.name}</span>
      </div>

      <div className="mb-4">
        <div className="mb-2 text-sm">Размер</div>

        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s.value}
              onClick={() => setSelectedSize(s.value)}
              className={`rounded border px-3 py-1 text-sm transition ${
                selectedSize === s.value ? 'bg-primary text-white' : 'hover:bg-muted'
              }`}>
              {s.value}
            </button>
          ))}
        </div>
      </div>

      {cartItem ? (
        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button size="lg">Перейти в корзину</Button>
          </Link>

          <Button
            className="w-10"
            size="lg"
            variant="outline"
            onClick={() =>
              decrementItem({
                productId: cartItem.id,
                size: cartItem.size,
              })
            }>
            -
          </Button>

          <span>{cartItem.quantity}</span>

          <Button
            className="w-10"
            size="lg"
            variant="outline"
            onClick={() =>
              incrementItem({
                productId: cartItem.id,
                size: cartItem.size,
              })
            }>
            +
          </Button>
        </div>
      ) : (
        <Button size="lg" onClick={handleAddToCart} disabled={!selectedSize || isLoading} className="h-11 w-full">
          {isLoading ? 'Добавление...' : 'Добавить в корзину'}
        </Button>
      )}
    </div>
  )
}
