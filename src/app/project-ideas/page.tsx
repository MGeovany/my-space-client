'use client'
import dynamic from 'next/dynamic'

import routes from '@/config/routes'

const NextSeo = dynamic(() => import('next-seo').then((mod) => mod.NextSeo), {
  ssr: false,
})

export default function ProjectIdeas() {
  return (
    <NextSeo
      title={routes.projectIdeas.seo.title}
      description={routes.projectIdeas.seo.description}
      openGraph={routes.projectIdeas.seo.openGraph}
    />
  )
}
