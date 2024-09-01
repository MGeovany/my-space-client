'use client'

import { usePathname } from 'next/navigation'
import { UserProfile, useUser } from '@auth0/nextjs-auth0/client'
import { Linkedin, Plus } from 'lucide-react'

import {
  BookmarksIcon,
  ExternalLinkIcon,
  GitHubIcon,
  HomeIcon,
  WritingIcon,
} from '@/components/icon'
import { NavigationLink } from './navigation-link'

import { GhostButton } from '@/components/button'
import { ProjectIcon } from '@/components/icons/shared'
import { API_URL, rolNameSpace } from '@/constants'
import { useEffect, useState } from 'react'
import { getAccessToken } from '@auth0/nextjs-auth0'
import axios from 'axios'

function ThisAddBookmarkDialog() {
  const { user } = useUser()

  if (!user) return null

  const handleSendBookmark = async () => {
    const { accessToken } = await getAccessToken()

    /*   const response = await axios.post(`${API_URL}/bookmark`, {
      title: 'This is a bookmark',
      url: 'https://example.com',
      description: 'This is a bookmark content',
      tag: 'porfolio',
    }) */

    console.log(accessToken, 'accessToken')
  }

  return (
    <div onClick={handleSendBookmark}>
      <GhostButton aria-label="Add bookmark" size="small-square">
        <Plus size={16} />
      </GhostButton>
    </div>
  )
}

export function SidebarNavigation() {
  const pathname = usePathname()
  const { user } = useUser()

  let roles = []

  /* if (user) {
    const decodedToken: any = jwtDecode(user.idToken as string)
    roles = decodedToken[rolNameSpace]
  } */

  const getUserRole = (user: UserProfile | undefined) => {
    const roles = user?.[rolNameSpace] as string[] | undefined
    return roles ? roles[0] : null
  }

  const sections = [
    {
      label: null,
      items: [
        {
          href: '/',
          label: 'Home',
          icon: HomeIcon,
          trailingAccessory: null,
          isActive: pathname === '/',
          trailingAction: null,
          isExternal: false,
        },

        {
          href: '/writing',
          label: 'Writing',
          icon: WritingIcon,
          trailingAccessory: null,
          isActive: pathname === '/writing',
          trailingAction: null,
          isExternal: false,
        },
      ],
    },
    {
      label: 'Me',
      items: [
        {
          href: '/bookmarks',
          label: 'Bookmarks',
          icon: BookmarksIcon,
          trailingAccessory: null,
          isActive: pathname === '/bookmarks',
          isExternal: false,
          trailingAction:
            getUserRole(user) === 'admin' ? ThisAddBookmarkDialog : null,
        },
        {
          href: '/project-ideas',
          label: 'Project Ideas',
          icon: ProjectIcon,
          trailingAccessory: null,
          isActive: pathname === '/project-ideas',
          trailingAction:
            getUserRole(user) === 'admin' ? ThisAddBookmarkDialog : null,
          isExternal: false,
        },
      ],
    },

    {
      label: 'Online',
      items: [
        {
          href: 'https://github.com/mgeovany',
          label: 'GitHub',
          icon: GitHubIcon,
          trailingAccessory: ExternalLinkIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true,
        },

        {
          href: 'https://www.linkedin.com/in/m-geovany/',
          label: 'LinkedIn',
          icon: Linkedin,
          trailingAccessory: ExternalLinkIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true,
        },
      ],
    },
  ]

  return (
    <div className="flex-1 px-3 py-3 space-y-1">
      {sections.map((section, i) => {
        return (
          <ul key={i} className="space-y-1">
            {section.label && (
              <h4
                key={i}
                className="px-2 pt-5 pb-2 text-xs font-semibold text-gray-1000 text-opacity-40 dark:text-white"
              >
                {section.label}
              </h4>
            )}
            {section.items.map((item, j) => (
              <NavigationLink key={j} link={item} />
            ))}
          </ul>
        )
      })}
    </div>
  )
}
