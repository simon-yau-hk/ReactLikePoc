// FirstNext/my-app/context/AppContext.tsx
'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  token: string | null
  user: any | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<any | null>(null)
  const router = useRouter()

  // Check token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('jwt_token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken) {
      setToken(storedToken)
      setUser(storedUser ? JSON.parse(storedUser) : null)
    }
  }, [])

  // Login function with API call
  const login = async (email: string, password: string) => {
    setToken('token')
    setUser('user')
    localStorage.setItem('jwt_token', 'token')
    localStorage.setItem('user', JSON.stringify('user'))
    router.push('/dashboard')
    // try {
    //   const response = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password })
    //   })
      
    //   const data = await response.json()
      
    //   if (response.ok) {
    //     setToken(data.token)
    //     setUser(data.user)
    //     localStorage.setItem('jwt_token', data.token)
    //     localStorage.setItem('user', JSON.stringify(data.user))
    //     router.push('/dashboard')
    //   } else {
    //     throw new Error(data.message || 'Login failed')
    //   }
    // } catch (error) {
    //   console.error('Login failed:', error)
    //   throw error // Re-throw to handle in component if needed
    // }
  }

  // Logout function
  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{
      token,
      user,
      isAuthenticated: !!token,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}