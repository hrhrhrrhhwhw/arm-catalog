'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArrowDownWideNarrow, ArrowUpNarrowWide, ChevronDown } from 'lucide-react'
import { useTransition } from 'react'
import { Spinner } from '@/components/ui/spinner'

export default function FilterPrice() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const currentSort = searchParams.get('price')

  const updateSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (currentSort === value) {
      params.delete('price')
    } else {
      params.set('price', value)
    }

    params.delete('page')

    const qs = params.toString()
    const newUrl = qs ? `${pathname}?${qs}` : pathname

    startTransition(() => {
      router.push(newUrl, { scroll: false })
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          className="cursor=pointer flex h-11 min-w-40 items-center gap-2 text-sm text-primary"
          variant="secondary">
          По цене
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex w-64 flex-col gap-2 p-2">
        <DropdownMenuCheckboxItem
          checked={currentSort === 'price_asc'}
          onCheckedChange={() => updateSort('price_asc')}
          onSelect={(e) => e.preventDefault()}
          className="flex cursor-pointer items-center gap-2 text-base">
          По возрастанию
          <ArrowUpNarrowWide />
          {isPending && currentSort === 'price_desc' && <Spinner />}
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={currentSort === 'price_desc'}
          onCheckedChange={() => updateSort('price_desc')}
          onSelect={(e) => e.preventDefault()}
          className="flex cursor-pointer items-center gap-2 text-base">
          По убыванию
          <ArrowDownWideNarrow />
          {isPending && currentSort === 'price_asc' && <Spinner />}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
