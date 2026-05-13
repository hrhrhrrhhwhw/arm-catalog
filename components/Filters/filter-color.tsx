'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState, useTransition } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { ChevronDown } from 'lucide-react'
import { ProductCard } from '@/lib/types/types'

type Props = {
  products: ProductCard[]
}

export default function FilterColor({ products }: Props) {
  const uniqueColors = Array.from(
    new Map(
      products.map((p) => [
        p.color.name,
        {
          name: p.color.name,
          hex: p.color.hex,
        },
      ])
    ).values()
  )

  const [pendingColor, setPendingColor] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const colorParam = searchParams.get('color')
  const checkedColors = colorParam?.split(',').filter(Boolean) ?? []

  const isChecked = (name: string) => checkedColors.includes(name)

  const toggleColor = (name: string) => {
    setPendingColor(name)
    const next = checkedColors.includes(name) ? checkedColors.filter((c) => c !== name) : [...checkedColors, name]

    updateUrl(next)
  }

  const updateUrl = (list: string[]) => {
    const params = new URLSearchParams(searchParams.toString())

    if (list.length) {
      params.set('color', list.join(','))
    } else {
      params.delete('color')
    }

    params.delete('page')

    // получаем строку запроса
    const qs = params.toString()

    // формируем новый url
    const newUrl = qs ? `${pathname}?${qs}` : pathname

    // обновляем url
    startTransition(() => {
      router.push(newUrl, { scroll: false })
    })
  }

  const clear = () => {
    updateUrl([])
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          className="flex h-11 min-w-40 cursor-pointer items-center gap-2 text-sm text-primary"
          variant="secondary">
          По цвету {checkedColors.length > 0 && `(${checkedColors.length})`}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 p-2">
        <div className="mb-2 flex justify-between px-2 py-1">
          <span className="text-sm font-medium">Цвет</span>
          {checkedColors.length > 0 && (
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                clear()
              }}
              className="cursor-pointer text-sm">
              Сбросить
            </DropdownMenuItem>
          )}
        </div>

        {uniqueColors.map((color) => {
          const checked = isChecked(color.name)

          return (
            <DropdownMenuCheckboxItem
              key={color.hex}
              className="cursor-pointer text-sm"
              checked={checked}
              onCheckedChange={() => toggleColor(color.name)}
              onSelect={(e) => e.preventDefault()}>
              <div className="flex h-11 items-center gap-3 pl-1">
                <div className="h-5 w-5 rounded-full" style={{ background: color.hex }} />
                {color.name}
              </div>
              {isPending && pendingColor === color.name && <Spinner />}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
