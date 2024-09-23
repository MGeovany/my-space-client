import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { API_URL } from '@/constants'

interface ProjectIdeaProps {
  projectIdea?: ProjectIdeas // Optional for editing case
  onClose: () => void
}

const ProjectIdeaForm = ({ projectIdea, onClose }: ProjectIdeaProps) => {
  const [title, setTitle] = useState(projectIdea?.title || '')
  const [url, setUrl] = useState(projectIdea?.url || '')
  const [description, setDescription] = useState(projectIdea?.description || '')

  useEffect(() => {
    if (projectIdea) {
      setTitle(projectIdea.title)
      setUrl(projectIdea.url)
      setDescription(projectIdea.description)
    }
  }, [projectIdea])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const accessToken = localStorage.getItem('auth0Token')

    if (!accessToken) {
      console.error('No access token available')
      return
    }

    try {
      if (projectIdea) {
        // Editing case
        const response = await axios.put(
          `${API_URL}/projectIdea/${projectIdea.id}`,
          {
            title,
            url,
            description,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )

        if (response.status === 200) {
          toast.success('Project Idea updated successfully')
        }
      } else {
        // Adding case
        const response = await axios.post(
          `${API_URL}/projectIdea`,
          {
            title,
            url,
            description,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )

        if (response.status === 200) {
          toast.success('Project Idea added successfully')
        }
      }

      onClose() // Close the modal after the form is submitted
    } catch (error) {
      toast.error('Failed to submit projectIdea')
      console.error(error)
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

      <button
        type="submit"
        className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
      >
        Submit
      </button>
    </form>
  )
}

export default ProjectIdeaForm
