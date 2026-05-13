'use client'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { TextAlignJustify } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'
import Loading from './loading'
import { useGetCategoriesQuery } from '@/services/categories'
import { Category } from '@/app/generated/prisma/client'

export default function MenuSheet() {
  const { data, isLoading, isError } = useGetCategoriesQuery()

  const categories = data?.categories || []

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <div>Ошибка загрузки категорий</div>
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <TextAlignJustify size={30} className="cursor-pointer text-primary" />
      </SheetTrigger>
      <SheetContent showCloseButton={false} side="left" className="max-w-full p-4">
        <div className="my-2 overflow-y-scroll">
          <div className="flex flex-col gap-4 pl-4">
            {categories.map((category: Category) => (
              <SheetClose asChild key={category.id}>
                <Link
                  href={`/catalog/${category.slug.toLowerCase()}`}
                  key={category.id}
                  className="text-xl text-primary hover:text-chart-5">
                  {category.name}
                </Link>
              </SheetClose>
            ))}
          </div>
        </div>

        <SheetFooter>
          <div className="flex flex-col items-center py-5">
            <SheetTitle className="mb-3 text-xl font-bold text-chart-5">Наши соцсети:</SheetTitle>
            <SheetDescription>
              <div className="flex gap-4">
                <Link href="instagram.com">
                  <div className="flex flex-col items-center justify-center">
                    <Image src="/PNG/instagram.png" width={40} height={40} alt="INST" />
                    <span>INSTAGRAM</span>
                  </div>
                </Link>
                <Link href="instagram.com">
                  <div className="flex flex-col items-center justify-center">
                    <Image src="/PNG/telegram.png" width={40} height={40} alt="TG" />
                    <span>TELEGRAM</span>
                  </div>
                </Link>
                <Link href="instagram.com">
                  <div className="flex flex-col items-center justify-center">
                    <Image src="/PNG/youtube.png" width={40} height={40} alt="INST" />
                    <span>YOUTUBE</span>
                  </div>
                </Link>
              </div>
            </SheetDescription>
          </div>
          <SheetClose asChild>
            <Button variant="default" className="h-11 cursor-pointer text-base">
              Закрыть
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
