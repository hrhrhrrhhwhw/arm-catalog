'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

interface ProductGalleryProps {
  images: string[]
  name: string
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  return (
    <>
      <div className="md:hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={8}
          slidesPerView={1}
          resistanceRatio={0.6}
          touchRatio={1}>
          {images.map((src, i) => (
            <SwiperSlide key={src}>
              <div className="relative aspect-4/5 w-full bg-neutral-100">
                <Image
                  src={src}
                  alt={`${name} ${i + 1}`}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden grid-cols-2 gap-2 md:grid">
        {images.map((src, i) => (
          <div key={src} className="relative aspect-4/5 bg-neutral-100">
            <Image
              src={src}
              alt={`${name} ${i + 1}`}
              fill
              loading={i === 0 ? 'eager' : 'lazy'}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </>
  )
}
