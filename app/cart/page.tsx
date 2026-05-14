'use client'

import CartItemCard from '@/components/Cart/cart-item'
import Loading from '@/components/loading'
import Order from '@/components/Order/order'
import { useGetCartQuery } from '@/services/cart'

export default function CartPage() {
  const { data: cart = [], isLoading } = useGetCartQuery()

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)

  if (isLoading) return <Loading />
  console.log(cart)

  return (
    <div className="w-full md:px-4">
      <h2 className="mb-5 px-2 text-xl font-semibold text-primary md:text-2xl">Корзина</h2>
      <div className="mb-5">
        Сумма заказа: <span className="text-lg font-bold text-primary">{total.toLocaleString('ru-RU')}</span> рублей
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-2 max-h-130 md:w-1/2 md:overflow-y-auto md:pr-2">
          {cart.map((c) => (
            <CartItemCard key={`${c.id}-${c.size}`} item={c} />
          ))}
        </div>
        <Order />
      </div>
    </div>
  )
}
