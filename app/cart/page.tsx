'use client'

import CartItemCard from '@/components/Cart/cart-item'
import Loading from '@/components/loading'
import { useGetCartQuery } from '@/services/cart'

export default function CartPage() {
  const { data: cart = [], isLoading } = useGetCartQuery()

  if (isLoading) return <Loading />

  return (
    <div className="w-full pt-5 md:px-4">
      <h2 className="mb-5 px-2 text-xl font-semibold text-primary md:text-2xl">Корзина</h2>
      <div className="mt-7 grid grid-cols-1 gap-y-2 md:w-1/2">
        {cart.map((c) => (
          <CartItemCard key={`${c.id}-${c.size}`} item={c} />
        ))}
      </div>
    </div>
  )
}
