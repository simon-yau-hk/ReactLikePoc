'use client'
import { useState, useEffect } from 'react'

export default function CSRPage() {
  const [message, setMessage] = useState('Initial message')
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    // This runs ONLY in the browser
    console.log('Client-side code running!')
    
    // Change message after 2 seconds
    setTimeout(() => {
      setMessage('Changed by client-side setTimeout!')
      console.log('Message changed by setTimeout')
    }, 2000)
    
    // Change message after 4 seconds
    setTimeout(() => {
      setMessage('Changed again by client-side code!')
      console.log('Message changed again')
    }, 4000)
    
    setMounted(true)
  }, [])
  

  
  return (
    <div>
      <h1>True Client-Side Code</h1>
      <p>Message: {message}</p>
      <p>This content changes only in the browser!</p>
    </div>
  )
}