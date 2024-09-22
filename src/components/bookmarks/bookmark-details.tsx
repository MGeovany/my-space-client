'use client'

import axios from 'axios'
import { LinkIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { PrimaryButton } from '@/components/button'
import { Icons } from '@/components/icons'
import { Detail } from '@/components/list-detail/detail'
import { TitleBar } from '@/components/list-detail/TitleBar'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { Tags } from '@/components/tag'
import routes from '@/config/routes'
import { API_URL } from '@/constants'

export function BookmarkDetail({ id }: { id: string }) {
  const [bookmark, setBookmarks] = useState<Bookmark>()
  const [imageBroken, setImageBroken] = useState<boolean>()
  const [loading, setLoading] = useState<boolean>(false)

  const scrollContainerRef: RefObject<HTMLDivElement> = useRef(null)
  const titleRef: MutableRefObject<HTMLParagraphElement | null> = useRef(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const response = await axios.get(`${API_URL}/bookmark/${id}`)
        const data = response.data
        if (data.success) {
          setBookmarks(data.data)
        }
      } catch (error) {
        toast.error(`Error fetching data: ${error}`)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return <Detail.Loading />
  }

  if (!bookmark) {
    return <Detail.Loading />
  }

  return (
    <>
      <NextSeo
        title={bookmark.title}
        description={bookmark.description}
        openGraph={{
          title: bookmark.title,
          description: bookmark.description,
          images: [
            {
              url: routes.bookmarks.seo.image || '',
              alt: routes.bookmarks.seo.description,
            },
          ],
        }}
      />
      <Detail.Container data-cy="bookmark-detail" ref={scrollContainerRef}>
        <TitleBar
          backButton
          globalMenu={false}
          backButtonHref={'/bookmarks'}
          magicTitle
          title={bookmark.title}
          titleRef={titleRef}
          scrollContainerRef={scrollContainerRef}
        />
        <Detail.ContentContainer>
          <Detail.Header>
            <Tags tags={bookmark.tag} />
            <Link
              href={bookmark.url}
              target="_blank"
              rel="noopener"
              className="block"
            >
              <Detail.Title ref={titleRef}>{bookmark.title}</Detail.Title>
            </Link>
            <Link
              href={bookmark.url}
              target="_blank"
              rel="noopener"
              className="flex items-center space-x-2 leading-snug text-tertiary"
            >
              {
                imageBroken ? <Icons.url /> : null
                /*   <Image
                  src={`https://www.google.com/s2/favicons?domain=${bookmark.url}`}
                  alt="favicon"
                  width={16}
                  height={16}
                  onError={() => setImageBroken(true)}
                /> */
              }
              <span>{new URL(bookmark.url).hostname}</span>
            </Link>
            {bookmark.description && (
              <MarkdownRenderer
                className="italic prose opacity-70"
                children={bookmark.description}
                variant="comment"
              />
            )}
          </Detail.Header>
          <div className="mt-6">
            <PrimaryButton
              size="large"
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkIcon size={14} />
              <span>Visit</span>
            </PrimaryButton>
          </div>
        </Detail.ContentContainer>
      </Detail.Container>
    </>
  )
}
