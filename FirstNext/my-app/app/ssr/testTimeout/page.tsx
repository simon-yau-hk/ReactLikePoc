export default async function SSRTestPage() {
  console.log('Server: Starting SSR render')
  
  // Simulate server-side delay
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  console.log('Server: SSR render complete')
  
  return (
    <div>
      <h1>SSR Test Page</h1>
      <p>This page took 3 seconds to render on the server</p>
      <p>Time: {new Date().toISOString()}</p>
    </div>
  )
}