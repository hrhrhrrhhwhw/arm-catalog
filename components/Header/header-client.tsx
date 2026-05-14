'use client'
import { HeaderCartButton } from './header-cart-button'
import Link from 'next/link'
import { HeaderBookMarksButton } from './header-bookmarks-button'
import MenuSheet from '../menu-sheet'
import { ToggleTheme } from '../toggle-theme'

export default function Header() {
  return (
    <div className="flex w-full justify-between px-4 py-4 md:px-6 md:py-4">
      <MenuSheet />
      <Link href="/">
        <span className="hidden text-xl font-bold text-primary md:block">catalog-fashion</span>
      </Link>
      <div className="flex gap-5">
        <ToggleTheme />
        <HeaderBookMarksButton />
        <HeaderCartButton />
      </div>
    </div>
  )
}
