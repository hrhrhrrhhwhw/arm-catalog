import Image from 'next/image'
import { CartItem } from '@/lib/types/types'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useDecrementItemMutation, useIncrementItemMutation, useRemoveItemMutation } from '@/services/cart'

type Props = {
  item: CartItem
}

export default function CartItemCard({ item }: Props) {
  const [incrementItem] = useIncrementItemMutation()
  const [decrementItem] = useDecrementItemMutation()
  const [removeItem] = useRemoveItemMutation()

  return (
    <div className="flex justify-between gap-2 bg-ring/10">
      <div className="flex w-full gap-2">
        <Image src={item.image} alt={item.name} width={100} height={150} />

        <div className="flex w-full flex-col justify-between p-2">
          <div>
            <Link className="hover:text-primary" href={`/product/${item.slug}`}>
              <h3 className="text-base">{item.name}</h3>
            </Link>

            <span className="text-sm text-muted-foreground">Размер: {item.size}</span>
          </div>

          <span>{item.price} ₽</span>

          <div className="flex w-full justify-between">
            <div className="flex items-center gap-5">
              <Button
                onClick={() => decrementItem({ productId: item.id, size: item.size })}
                variant="outline"
                size="lg">
                -
              </Button>
              <div>{item.quantity}</div>
              <Button
                onClick={() => incrementItem({ productId: item.id, size: item.size })}
                variant="outline"
                size="lg">
                +
              </Button>
            </div>
            <div>
              <Button
                onClick={() => removeItem({ productId: item.id, size: item.size })}
                variant="destructive"
                size="lg">
                удалить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
