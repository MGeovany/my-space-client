'use client'

import dynamic from 'next/dynamic'

import routes from '@/config/routes'

const NextSeo = dynamic(() => import('next-seo').then((mod) => mod.NextSeo), {
  ssr: false,
})

export default function ProjectIdeas() {
  return (
    <NextSeo
      title={routes.writing.seo.title}
      description={routes.writing.seo.description}
      openGraph={routes.writing.seo.openGraph}
    />
  )
}
