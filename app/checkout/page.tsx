'use client'

import { Suspense } from 'react'
import { CheckoutContainer } from './CheckoutContainer'

function CheckoutPageContent() {
  return <CheckoutContainer />
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          로딩 중...
        </div>
      }
    >
      <CheckoutPageContent />
    </Suspense>
  )
}
