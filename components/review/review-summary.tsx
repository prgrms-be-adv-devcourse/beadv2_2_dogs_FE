'use client'

import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Star } from 'lucide-react'

interface ReviewSummaryProps {
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    rating: number
    count: number
  }[]
}

export function ReviewSummary({
  averageRating,
  totalReviews,
  ratingDistribution,
}: ReviewSummaryProps) {
  const distributionMap = ratingDistribution.reduce(
    (acc, item) => {
      acc[item.rating] = item.count
      return acc
    },
    {} as Record<number, number>
  )

  return (
    <Card className="p-6">
      <div className="flex items-center gap-8">
        {/* Average Rating */}
        <div className="text-center">
          <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(averageRating)
                    ? 'fill-primary text-primary'
                    : 'fill-muted text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">총 {totalReviews}개 리뷰</div>
        </div>

        {/* Rating Distribution */}
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = distributionMap[rating] || 0
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0

            return (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium">{rating}점</span>
                  <Star className="h-3 w-3 fill-primary text-primary" />
                </div>
                <Progress value={percentage} className="flex-1 h-2" />
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {count}개
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}

