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

import { NavigationLink } from './navigation-link'

function ThisAddBookmarkDialog() {
  const [opened, { open, close }] = useDisclosure(false)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault() // Previene la recarga de la página

    const res = await axios.get('/api/auth/get-auth0-token')
    localStorage.setItem('accessToken', res.data.accessToken)

    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      console.error('No access token available')
      return
    }

    try {
      const response = await axios.post(
        `${API_URL}/bookmark`,
        {
          title,
          url,
          description,
          tag,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      close() // Cierra el modal después de agregar el bookmark

      if (response.status === 200) {
        toast.success('Bookmark added successfully')
      }
    } catch (error) {
      toast.error('Failed to add bookmark')
      console.error(error)
    }
  }

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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-white mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                required
              />
            </div>

            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700"
              >
                URL
              </label>
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                rows={3}
                required
              />
            </div>

            <div>
              <label
                htmlFor="tag"
                className="block text-sm font-medium text-gray-700"
              >
                Tag
              </label>
              <select
                id="tag"
                value={tag}
                onChange={(e) => setTag(e.target.value as BookmarkTag)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                required
              >
                {Object.values(BookmarkTag).map((tagValue) => (
                  <option key={tagValue} value={tagValue}>
                    {tagValue}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
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
