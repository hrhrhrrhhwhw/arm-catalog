export type ProductCard = {
  id: number
  name: string
  slug: string
  category: { name: string; slug: string }
  price: number
  oldPrice?: number | null
  color: { name: string; hex: string }
  images: string[]
}

export type CartItem = {
  id: number
  name: string
  slug: string
  image: string
  price: number
  quantity: number
  size: string
}


