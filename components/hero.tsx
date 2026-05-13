import Link from 'next/link'
import { Button } from './ui/button'

export default function Hero() {
  return (
    <div className="flex h-200 w-full items-center justify-start bg-[url('/hero.png')] bg-cover bg-center px-2 md:px-10">
      <div className="flex flex-col justify-start md:gap-10">
        <h1 className="text-8xl font-semibold">SPRING</h1>
        <p className="text-8xl font-semibold">2026</p>
        <Link href="/catalog">
          <Button className="h-11 cursor-pointer text-base" variant="default">
            SHOP NOW
          </Button>
        </Link>
      </div>
    </div>
  )
}
