import { ShoppingCart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useGetCartQuery } from '@/services/cart'

export function HeaderCartButton() {
  const { data: cart = [] } = useGetCartQuery()
  return (
    <Link href="/cart" className="relative">
      <ShoppingCart size={30} className="cursor-pointer text-primary" />
      {cart?.length > 0 && (
        <Badge variant="secondary" className="absolute -top-2 -right-2 px-1.5 py-0 text-sm">
          {cart?.length}
        </Badge>
      )}
    </Link>
  )
}
