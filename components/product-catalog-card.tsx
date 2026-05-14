'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Toggle } from './ui/toggle'
import { BookmarkIcon } from 'lucide-react'
import { ProductCard } from '@/lib/types'
import { useRef, useState } from 'react'
import { useGetBookmarksQuery, useToggleBookmarkMutation } from '@/services/bookmarks'

type ProductCardProps = {
  product: ProductCard
}

export default function ProductCatalogCard({ product }: ProductCardProps) {
  const images = product.images?.filter(Boolean).length > 0 ? product.images.filter(Boolean) : ['/placeholder.jpg']

  const [activeIndex, setActiveIndex] = useState(0)

  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const isSwiping = useRef(false)

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    const diffX = Math.abs(touch.clientX - touchStartX.current)
    const diffY = Math.abs(touch.clientY - touchStartY.current)

    if (diffX > diffY && diffX > 10) {
      isSwiping.current = true
      e.preventDefault()
    }
  }

  // mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStartX.current = touch.clientX
    touchStartY.current = touch.clientY
    isSwiping.current = false
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isSwiping.current) return

    const deltaX = e.changedTouches[0].clientX - touchStartX.current

    if (Math.abs(deltaX) > 40) {
      setActiveIndex((prev) => (deltaX < 0 ? Math.min(prev + 1, images.length - 1) : Math.max(prev - 1, 0)))
    }

    isSwiping.current = false
  }

  const { data: bookmarks = [] } = useGetBookmarksQuery()

  const isActive = bookmarks.some((p) => p.id === product.id)

  const [toggleBookmark] = useToggleBookmarkMutation()

  const handleClick = () => {
    toggleBookmark(product)
  }

  return (
    <div className="group relative">
      <div className="absolute top-2 right-2 z-20">
        <Toggle
          aria-label="Toggle bookmark"
          size="lg"
          variant="default"
          pressed={isActive}
          onPressedChange={handleClick}>
          <BookmarkIcon className={cn('transition-colors', isActive ? 'fill-primary text-primary' : 'text-primary')} />
        </Toggle>
      </div>

      <Link href={`/product/${product.slug}`} className="block">
        <div
          className="relative aspect-3/4 overflow-hidden bg-neutral-100"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}>
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={product.name}
              fill
              className={cn(
                'object-cover transition-opacity duration-200',
                index === activeIndex ? 'opacity-100' : 'opacity-0'
              )}
            />
          ))}

          <div className="absolute inset-0 z-10 hidden md:flex">
            {images.map((_, index) => (
              <div key={index} className="flex-1" onMouseEnter={() => setActiveIndex(index)} />
            ))}
          </div>

          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1">
            {images.map((_, index) => (
              <span
                key={index}
                className={cn(
                  'h-0.5 w-8 bg-background transition-opacity',
                  index === activeIndex ? 'opacity-100' : 'opacity-40'
                )}
              />
            ))}
          </div>
        </div>
      </Link>

      <div className="mt-2 flex flex-col gap-1 pl-2">
        <p className="text-sm text-muted-foreground">{product.name}</p>

        <div className="flex items-center gap-2">
          <span className="text-base font-medium">{product.price} ₽</span>

          {product.oldPrice && <span className="text-sm text-primary line-through">{product.oldPrice} ₽</span>}

          <span className="h-4 w-4 rounded-full" style={{ backgroundColor: product.color?.hex ?? '#ccc' }} />
        </div>
      </div>
    </div>
  )
}
