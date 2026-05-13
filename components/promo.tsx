import Image from 'next/image'

const IMAGES = [
  { id: 1, url: '/images/Rectangle.webp' },
  { id: 2, url: '/images/Rectangle-1.webp' },
  { id: 3, url: '/images/Rectangle-2.webp' },
  { id: 4, url: '/images/Rectangle-3.webp' },
  { id: 5, url: '/images/Rectangle-4.webp' },
  { id: 6, url: '/images/Rectangle-5.webp' },
  { id: 7, url: '/images/Rectangle-6.webp' },
]

export default function Promo() {
  return (
    <>
      <h2 className="mb-4 text-center text-4xl font-bold">Collections</h2>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {IMAGES.map((image) => (
          <Image
            key={image.id}
            src={image.url}
            sizes="(max-width: 768px) 100vw, 33vw"
            alt="Коллекция"
            width={400}
            height={300}
            className="h-auto w-full"
          />
        ))}
      </div>
    </>
  )
}
