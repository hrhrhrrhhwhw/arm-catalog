import { Bookmark } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useGetBookmarksQuery } from '@/services/bookmarks'

export function HeaderBookMarksButton() {
  const { data: bookmarks = [] } = useGetBookmarksQuery()

  return (
    <Link href="/bookmarks" className="relative">
      <Bookmark size={30} className="cursor-pointer text-primary" />
      {bookmarks.length > 0 && (
        <Badge variant="secondary" className="absolute -top-2 -right-2 px-1.5 py-0 text-sm">
          {bookmarks.length}
        </Badge>
      )}
    </Link>
  )
}
