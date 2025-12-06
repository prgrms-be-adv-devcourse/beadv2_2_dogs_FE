import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* 이미지 영역 스켈레톤 */}
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="aspect-square w-full rounded-lg" />
              ))}
            </div>
          </div>

          {/* 정보 영역 스켈레톤 */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-56" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-14" />
              </div>
              <Skeleton className="h-4 w-40" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-44" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-28" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-9 w-9 rounded-md" />
                  <Skeleton className="h-5 w-10" />
                  <Skeleton className="h-9 w-9 rounded-md" />
                </div>
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-56 w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-56 w-full" />
            <Skeleton className="h-56 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}



