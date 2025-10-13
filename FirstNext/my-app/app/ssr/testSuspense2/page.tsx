// NextJs/app/ssr/testSuspense/page.tsx
import { Suspense } from 'react'
import { Product } from '@/components/product'
import { Review } from '@/components/review'

export default function SuspenseTestPage() {
  return (
    <div>
      <h1>Suspense Test Page</h1>
      <Suspense fallback={<div>Loading product...</div>}>
        <Product />
      </Suspense>
      <Suspense fallback={<div>Loading review...</div>}>
        <Review />
      </Suspense>
    </div>
  ) 
}

  
