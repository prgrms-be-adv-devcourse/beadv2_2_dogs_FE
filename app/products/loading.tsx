import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 스켈레톤 */}
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>

      {/* 페이지 헤더 스켈레톤 */}
      <section className="py-12 bg-muted/30 border-b">
        <div className="container mx-auto px-4 space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
      </section>

      {/* 검색/필터 스켈레톤 */}
      <section className="py-6 border-b bg-background sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </section>

      {/* 상품 카드 스켈레톤 그리드 */}
      <section className="py-12">
        <div className="container mx-auto px-4 space-y-4">
          <Skeleton className="h-4 w-40" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <Skeleton className="aspect-square w-full" />
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-1" />
                    <Skeleton className="h-4 w-14" />
                  </div>
                  <Skeleton className="h-5 w-32" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-4 w-14" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
