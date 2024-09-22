'use client'

import { UserProfile, useUser } from '@auth0/nextjs-auth0/client'
import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import axios from 'axios'
import { Linkedin, Plus } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { GhostButton } from '@/components/button'
import {
  BookmarksIcon,
  ExternalLinkIcon,
  GitHubIcon,
  HomeIcon,
  WritingIcon,
} from '@/components/icon'
import { ProjectIcon } from '@/components/icons/shared'
import { API_URL, BookmarkTag, rolNameSpace } from '@/constants'

import BookmarkForm from '../bookmarks/bookmark-form'
import { NavigationLink } from './navigation-link'

function ThisAddBookmarkDialog() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <div onClick={open}>
        <GhostButton aria-label="Add bookmark" size="small-square">
          <Plus size={16} />
        </GhostButton>
      </div>
      <Modal opened={opened} onClose={close} centered padding={'lg'}>
        <div className="px-10 pb-5">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Create Bookmark
          </h2>
          <BookmarkForm onClose={close} />
        </div>
      </Modal>
    </>
  )
}

export function SidebarNavigation() {
  const pathname = usePathname()
  const { user } = useUser()

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
