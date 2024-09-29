import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { API_URL } from '@/constants'

import { MarkdownRenderer } from '../markdown-renderer'

interface BlogFormProps {
  blog?: Blog // Optional for editing case
  onClose: () => void
}
const BlogForm = ({ blog, onClose }: BlogFormProps) => {
  const [title, setTitle] = useState(blog?.title || '')
  const [content, setContent] = useState(blog?.content || '')

  useEffect(() => {
    if (blog) {
      setTitle(blog.title)
      setContent(blog.content)
    }
  }, [blog])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const response = await axios.get('/api/auth/get-auth0-token')
      const auth0Token = response.data.accessToken
      localStorage.setItem('auth0Token', auth0Token)

      if (!auth0Token) {
        toast.error('No access token available')
        return
      }

      if (blog) {
        // Editing case
        const response = await axios.put(
          `${API_URL}/blog/${blog.id}`,
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: `Bearer ${auth0Token}`,
            },
          }
        )

        if (response.status === 200) {
          toast.success('Bookmark updated successfully')
        }
      } else {
        // Adding case
        const response = await axios.post(
          `${API_URL}/blog`,
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: `Bearer ${auth0Token}`,
            },
          }
        )

        if (response.status === 200) {
          toast.success('Bookmark added successfully')
        }
      }
      onClose() // Close the modal after the form is submitted
      window.location.reload() // Refresh the page to see the updated list
    } catch (error) {
      toast.error('There was an error, please try again')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        {/* Input para el título */}
        <div className="w-fit my-4">
          <label
            htmlFor="title"
            className="block text-md text-gray-700 font-black"
          >
            Title
          </label>
          <div className="flex flex-row gap-2">
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black min-w-80"
              required
            />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <div className="w-1/2">
            <label
              htmlFor="content"
              className="block text-sm font-black text-gray-700"
            >
              Content
            </label>
            <textarea
              id="description"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              rows={50}
              required
            />
          </div>
          {/* Previsualización en markdown */}
          <div className="w-1/2 bg-gray-100 p-4 border rounded mt-5">
            <MarkdownRenderer children={content} />
            {content}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="w-auto py-2 px-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Submit
        </button>
      </div>
    </form>
  )
}
export default BlogForm
