'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, ThumbsUp, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface Review {
  id: number
  author: string
  rating: number
  date: string
  content: string
  images?: string[]
  helpful?: number
  verified?: boolean
}

interface ReviewListProps {
  reviews: Review[]
  onLoadMore?: () => void
  hasMore?: boolean
  showFilter?: boolean
}

export function ReviewList({ reviews, onLoadMore, hasMore, showFilter = true }: ReviewListProps) {
  const [sortBy, setSortBy] = useState('recent')
  const [filterRating, setFilterRating] = useState('all')

  const sortedAndFilteredReviews = reviews
    .filter((review) => {
      if (filterRating === 'all') return true
      return review.rating === Number(filterRating)
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'rating-high':
          return b.rating - a.rating
        case 'rating-low':
          return a.rating - b.rating
        case 'helpful':
          return (b.helpful || 0) - (a.helpful || 0)
        default:
          return 0
      }
    })

  const handleHelpful = (reviewId: number) => {
    // TODO: API 호출
    console.log('Helpful clicked for review:', reviewId)
  }

  if (reviews.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">아직 작성된 리뷰가 없습니다</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      {showFilter && (
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="정렬" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">최신순</SelectItem>
              <SelectItem value="rating-high">평점 높은순</SelectItem>
              <SelectItem value="rating-low">평점 낮은순</SelectItem>
              <SelectItem value="helpful">도움됨순</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterRating} onValueChange={setFilterRating}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="평점 필터" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="5">5점</SelectItem>
              <SelectItem value="4">4점</SelectItem>
              <SelectItem value="3">3점</SelectItem>
              <SelectItem value="2">2점</SelectItem>
              <SelectItem value="1">1점</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Reviews */}
      <div className="space-y-4">
        {sortedAndFilteredReviews.map((review) => (
          <Card key={review.id} className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="font-semibold">{review.author}</div>
                {review.verified && (
                  <Badge variant="secondary" className="text-xs">
                    구매확정
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">{review.date}</div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= review.rating
                        ? 'fill-primary text-primary'
                        : 'fill-muted text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{review.rating}점</span>
            </div>

            <p className="text-muted-foreground mb-4 whitespace-pre-wrap">{review.content}</p>

            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 rounded-lg overflow-hidden border cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={image}
                      alt={`Review image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-8"
                onClick={() => handleHelpful(review.id)}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                도움됨 {review.helpful || 0}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {hasMore && onLoadMore && (
        <div className="text-center">
          <Button variant="outline" onClick={onLoadMore}>
            리뷰 더보기
          </Button>
        </div>
      )}
    </div>
  )
}

