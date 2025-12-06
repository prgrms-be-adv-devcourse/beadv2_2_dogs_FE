import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sprout, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2">
            <Sprout className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">바로팜</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-primary" />
          </div>

          <h1 className="text-3xl font-bold mb-4">주문이 완료되었습니다!</h1>

          <p className="text-lg text-muted-foreground mb-2">
            주문번호:{' '}
            <span className="font-mono font-semibold text-foreground">ORD-2025-001234</span>
          </p>

          <p className="text-muted-foreground mb-8">
            신선한 농산물이 곧 배송될 예정입니다.
            <br />
            주문 내역은 이메일로도 발송되었습니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <Link href="/orders">주문 내역 보기</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/">홈으로 돌아가기</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
