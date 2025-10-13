// NextJs/app/posts/[id]/page.tsx
interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PostPage({ params }: PageProps) {
  const { id } = await params
  
  return (
    <div>
      <h1>Post {id}</h1>
      <p>This page is statically generated</p>
    </div>
  )
}

// This generates static pages for these IDs
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ]
}