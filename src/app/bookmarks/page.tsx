'use client'

import dynamic from 'next/dynamic'

import routes from '@/config/routes'

const NextSeo = dynamic(() => import('next-seo').then((mod) => mod.NextSeo), {
  ssr: false,
})

export default function BookmarksPage() {
  return (
    <>
      <NextSeo
        title={routes.bookmarks.seo.title}
        description={routes.bookmarks.seo.description}
        openGraph={routes.bookmarks.seo.openGraph}
      />
    </>
  )
}
