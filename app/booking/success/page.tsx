import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sprout, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function BookingSuccessPage() {
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

          <h1 className="text-3xl font-bold mb-4">예약이 완료되었습니다!</h1>

          <p className="text-lg text-muted-foreground mb-2">
            예약번호:{' '}
            <span className="font-mono font-semibold text-foreground">EXP-2025-001234</span>
          </p>

          <p className="text-muted-foreground mb-4">
            농장 체험 예약이 성공적으로 완료되었습니다.
            <br />
            예약 확인 메일이 발송되었으니 확인해주세요.
          </p>

          <div className="bg-muted/50 rounded-lg p-4 mb-8">
            <p className="text-sm text-muted-foreground mb-1">결제 수단</p>
            <p className="font-semibold">현장 결제</p>
            <p className="text-xs text-muted-foreground mt-2">체험 당일 현장에서 결제해주세요</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <Link href="/bookings">예약 내역 보기</Link>
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
