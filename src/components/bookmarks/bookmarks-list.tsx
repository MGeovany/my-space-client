'use client'
import { useEffect, useState } from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

import { ListContainer } from '@/components/list-detail/ListContainer'
import { BookmarksTitleBar } from '@/components/bookmarks/bookmarks-title-bar'
import { LoadingSpinner } from '@/components/loading-spinner'
import { API_URL } from '@/constants'
import { BookmarksListItem } from '@/components/bookmarks/bookmarks-list-item'

export const BookmarksList = () => {
  const pathname = usePathname()

  const [loading, setLoading] = useState(false)
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [scrollContainerRef, setScrollContainerRef] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${API_URL}/bookmark`)
      .then((response) => {
        setBookmarks(response.data.data)
      })
      .catch((error) => {
        toast.error('Error fetching bookmarks:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading && bookmarks.length === 0) {
    return (
      <ListContainer onRef={setScrollContainerRef}>
        <BookmarksTitleBar scrollContainerRef={scrollContainerRef} />
        <div className="flex flex-1 items-center justify-center">
          <LoadingSpinner />
        </div>
      </ListContainer>
    )
  }

  return (
    <ListContainer data-cy="bookmarks-list" onRef={setScrollContainerRef}>
      <BookmarksTitleBar scrollContainerRef={scrollContainerRef} />
      <LayoutGroup>
        <div className="lg:space-y-1 lg:p-3">
          {bookmarks.map((content) => {
            const isActive = pathname === `/bookmarks/${content.id}`

            return (
              <motion.div layout key={content.id}>
                <BookmarksListItem active={isActive} bookmark={content} />
              </motion.div>
            )
          })}
        </div>
      </LayoutGroup>
    </ListContainer>
  )
}
