import { useUser } from '@auth0/nextjs-auth0/client'

import { rolNameSpace } from '@/constants'

export function useUserRole() {
  const { user } = useUser()

  const getUserRole = () => {
    if (!user) return null
    const roles = user?.[rolNameSpace] as string[] | undefined
    return roles ? roles[0] : null
  }

  const userRole = getUserRole()

  return {
    userRole,
    user,
  }
}
