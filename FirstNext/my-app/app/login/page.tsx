// NextJs/app/(auth)/login/page.tsx
'use client'
import { useAuth } from '@/context/AppContext'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    login("token", "user")
    router.push('/dashboard')
    // try {
    //   const response = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password })
    //   })
      
    //   const data = await response.json()
      
    //   if (response.ok) {
    //     login(data.token, data.user)
    //   }
    // } catch (error) {
    //   console.error('Login failed:', error)
    // }
  }

  return (
    <form onSubmit={handleLogin}>
      <button className='bg-blue-500 text-white p-2 rounded-md' type="submit">Login2</button>
    </form>
  )
}