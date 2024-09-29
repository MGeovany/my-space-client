'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { API_URL, BookmarkTag } from '@/constants'

interface BookmarkFormProps {
  bookmark?: Bookmark // Optional for editing case
  onClose: () => void
}

const BookmarkForm = ({ bookmark, onClose }: BookmarkFormProps) => {
  const [title, setTitle] = useState(bookmark?.title || '')
  const [url, setUrl] = useState(bookmark?.url || '')
  const [description, setDescription] = useState(bookmark?.description || '')
  const [tag, setTag] = useState(bookmark?.tag || 'Tools')

  useEffect(() => {
    if (bookmark) {
      setTitle(bookmark.title)
      setUrl(bookmark.url)
      setDescription(bookmark.description)
      setTag(bookmark.tag)
    }
  }, [bookmark])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    toast.loading('Submitting bookmark...')

    const response = await axios.get('/api/auth/get-auth0-token')
    const auth0Token = response.data.accessToken
    localStorage.setItem('auth0Token', auth0Token)

    if (!auth0Token) {
      toast.dismiss()
      toast.error('No access token available')
      return
    }
    try {
      if (bookmark) {
        // Editing case
        const response = await axios.put(
          `${API_URL}/bookmark/${bookmark.id}`,
          {
            title,
            url,
            description,
            tag,
          },
          {
            headers: {
              Authorization: `Bearer ${auth0Token}`,
            },
          }
        )

        if (response.status === 200) {
          toast.dismiss()
          toast.success('Bookmark updated successfully')
        }
      } else {
        // Adding case
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
              Authorization: `Bearer ${auth0Token}`,
            },
          }
        )
        console.log(response)
        if (response.status === 201) {
          toast.dismiss()
          toast.success('Bookmark added successfully')
        }
      }

      onClose() // Close the modal after the form is submitted
      // window.location.reload() // Refresh the page to see the updated list
    } catch (error) {
      toast.dismiss()
      toast.error('Failed to submit bookmark')
    }
  }

  return (
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
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-white p-2 focus:border-black focus:ring-black"
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
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:ring-black"
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
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:ring-black"
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
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:ring-black"
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
        className="w-full rounded-lg bg-black px-4 py-2 font-semibold text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  )
}

export default BookmarkForm
