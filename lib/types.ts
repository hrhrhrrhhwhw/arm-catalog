export type Color = {
  id: number
  name: string
  hex: string
}

export type Category = {
  id: number
  name: string
  slug: string
}

export type SizeOption = {
  size: Size
  stock: number
}

export type Product = {
  id: number
  sku: string
  name: string
  category: string
  slug: string
  price: number
  oldPrice?: number
  images: string[]
  sizes: SizeOption
  color: Color
  composition: string
  sizeOnModel: string
  heightOnModel: string
  country: string
  description: string
  delivery: string
  return: string
  care: string
}

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
  oldPrice: number | null
  quantity: number
  size: string
  color: {
    hex: string
  }
}

export enum Size {
  XXS = 'XXS',
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  ONESIZE = 'ONESIZE',
}
