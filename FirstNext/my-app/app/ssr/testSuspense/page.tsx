// NextJs/app/ssr/testSuspense/page.tsx
import { Suspense } from 'react'

export default async function SuspenseTestPage({searchParams}: {searchParams: Promise<{id: string}>}) {
  const params = await searchParams
  const id = params.id || 'no-id'
  
  return (
    <div>
      <h1>Suspense Test Page</h1>
      <p>This content appears immediately</p>
      
      <Suspense fallback={<div>Loading slow component...</div>}>
        <SlowComponent id={id} />
      </Suspense>
      
      <p>This content also appears immediately</p>
    </div>
  )
}

async function SlowComponent({id}: {id: string}) {
  console.log('Server: SlowComponent starting')
  console.log('Server: SlowComponent id', id)
  
  // 3 second delay
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  console.log('Server: SlowComponent finished')
  
  return (
    <div>
      <h2>Slow Component</h2>
      <p>This component took 3 seconds to render</p>
      <p>ID: {id}</p>
      <p>Time: {new Date().toISOString()}</p>
    </div>
  )
}