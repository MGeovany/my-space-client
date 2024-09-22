import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext({
  isAdmin: false,
  setIsAdmin: (isAdmin: boolean) => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Simulación de autenticación
    const token = document.cookie.includes('auth-token=your-token') // Verifica si el token está presente

    if (token) {
      // setIsAdmin(true) // Actualiza según sea necesario
    }
  }, [router])

  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
