'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductsErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ProductsError({ error, reset }: ProductsErrorProps) {
  useEffect(() => {
    // TODO: 여기에서 로깅 서비스(Sentry 등) 연동 가능
    console.error('[products] error boundary:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">상품 정보를 불러오는 중 문제가 발생했어요</h1>
          <p className="text-sm text-muted-foreground">
            잠시 후 다시 시도해 주세요. 문제가 계속되면 관리자에게 문의해 주세요.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={() => (window.location.href = '/')}>
            홈으로 돌아가기
          </Button>
          <Button onClick={reset}>다시 시도하기</Button>
        </div>
      </div>
    </div>
  )
}



