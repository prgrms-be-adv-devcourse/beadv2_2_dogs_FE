'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import {
  ReviewForm,
  ReviewList,
  ReviewSummary,
  type Review as ReviewComponentType,
} from '@/components/review'
import { reviewService } from '@/lib/api/services/review'
import type { Review as ApiReview } from '@/lib/api/types'
import { getUserId } from '@/lib/api/client'

interface RatingDistribution {
  rating: number
  count: number
}

interface ProductReviewSectionProps {
  productId: string
  initialRating: number
  initialTotalReviews: number
  initialRatingDistribution: RatingDistribution[]
}

export function ProductReviewSection({
  productId,
  initialRating,
  initialTotalReviews,
  initialRatingDistribution,
}: ProductReviewSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [orderItemId, setOrderItemId] = useState<string | undefined>(undefined)
  const [editingReview, setEditingReview] = useState<ReviewComponentType | null>(null)
  const [isLoadingOrderItem, setIsLoadingOrderItem] = useState(false)
  const [reviews, setReviews] = useState<ReviewComponentType[]>([])
  const [isLoadingReviews, setIsLoadingReviews] = useState(false)
  const [ratingDistribution, setRatingDistribution] =
    useState<RatingDistribution[]>(initialRatingDistribution)
  const [averageRating, setAverageRating] = useState(initialRating)
  const [totalReviews, setTotalReviews] = useState(initialTotalReviews)
  const { toast } = useToast()

  const refreshReviews = useCallback(async () => {
    if (!productId) return

    setIsLoadingReviews(true)
    try {
      const response = await reviewService.getProductReviews(productId, { page: 0, size: 50 })
      const reviewsList = Array.isArray(response?.content) ? response.content : []
      const currentUserId = getUserId()

      const convertedReviews: ReviewComponentType[] = reviewsList.map((review: ApiReview) => {
        const userName = review.userName || '익명'
        const maskedName =
          userName.length > 1 ? `${userName[0]}${'*'.repeat(userName.length - 1)}` : userName

        const dateStr = review.createdAt
          ? new Date(review.createdAt)
              .toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })
              .replace(/\. /g, '.')
              .replace(/\.$/, '')
          : ''

        const imageUrls = review.imageUrls || review.images || []

        return {
          id: String(review.id),
          author: maskedName,
          rating: review.rating || 0,
          date: dateStr,
          content: review.content || '',
          images: imageUrls,
          helpful: review.helpfulCount || 0,
          verified: !!review.orderItemId,
          isMine: !!currentUserId && review.buyerId === currentUserId,
        }
      })

      setReviews(convertedReviews)
      setTotalReviews(reviewsList.length)

      if (reviewsList.length > 0) {
        const sum = reviewsList.reduce((acc, r) => acc + (r.rating || 0), 0)
        const avg = sum / reviewsList.length
        setAverageRating(Number(avg.toFixed(1)))
      } else {
        setAverageRating(0)
      }

      const distribution = [5, 4, 3, 2, 1].map((rating) => ({
        rating,
        count: reviewsList.filter((r: ApiReview) => r.rating === rating).length,
      }))
      setRatingDistribution(distribution)
    } catch (error: any) {
      console.error('리뷰 조회 실패:', error)
      setReviews([])
      setTotalReviews(0)
      setAverageRating(0)
      setRatingDistribution([
        { rating: 5, count: 0 },
        { rating: 4, count: 0 },
        { rating: 3, count: 0 },
        { rating: 2, count: 0 },
        { rating: 1, count: 0 },
      ])
    } finally {
      setIsLoadingReviews(false)
    }
  }, [productId])

  useEffect(() => {
    refreshReviews()
  }, [refreshReviews])

  const handleReviewSubmit = async () => {
    setShowReviewForm(false)
    setEditingReview(null)
    await refreshReviews()
  }

  const handleReviewFormCancel = () => {
    setShowReviewForm(false)
    setOrderItemId(undefined)
    setEditingReview(null)
  }

  const handleWriteReviewClick = async () => {
    setIsLoadingOrderItem(true)
    // 임의의 주문 아이템 ID (테스트용)
    setOrderItemId('00000000-0000-0000-0000-000000000000')
    setEditingReview(null)
    setShowReviewForm(true)
    try {
      console.log('Calling refreshProductReviewSummary...')
      await reviewService.refreshProductReviewSummary(String(productId))
      console.log('refreshProductReviewSummary success')
    } catch (error) {
      console.warn('리뷰 요약 갱신 실패:', error)
    }
    setIsLoadingOrderItem(false)
  }

  const handleEditReview = (review: ReviewComponentType) => {
    setEditingReview(review)
    setShowReviewForm(true)
  }

  const handleDeleteReview = async (review: ReviewComponentType) => {
    if (!confirm('리뷰를 삭제하시겠습니까?')) return
    try {
      await reviewService.deleteReview(review.id)
      toast({
        title: '리뷰가 삭제되었습니다',
        description: '리뷰가 정상적으로 삭제되었습니다.',
      })
      await refreshReviews()
    } catch (error: any) {
      console.error('리뷰 삭제 실패:', error)
      toast({
        title: '리뷰 삭제 실패',
        description: '리뷰 삭제 중 오류가 발생했습니다.',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      {/* Review Summary */}
      {!isLoadingReviews && (
        <ReviewSummary
          averageRating={averageRating > 0 ? averageRating : 0}
          totalReviews={totalReviews > 0 ? totalReviews : 0}
          ratingDistribution={ratingDistribution}
        />
      )}

      {/* Review Form */}
      {showReviewForm && (
        <ReviewForm
          productId={String(productId)}
          orderItemId={orderItemId}
          mode={editingReview ? 'edit' : 'create'}
          reviewId={editingReview?.id}
          initialRating={editingReview?.rating ?? 0}
          initialContent={editingReview?.content ?? ''}
          initialImages={editingReview?.images ?? []}
          onSubmit={handleReviewSubmit}
          onCancel={handleReviewFormCancel}
        />
      )}

      {/* Reviews */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">고객 리뷰 ({totalReviews > 0 ? totalReviews : 0})</h2>
          {!showReviewForm && (
            <Button
              variant="outline"
              onClick={handleWriteReviewClick}
              disabled={isLoadingOrderItem}
            >
              {isLoadingOrderItem ? '확인 중...' : '리뷰 작성'}
            </Button>
          )}
        </div>
        {isLoadingReviews ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">리뷰를 불러오는 중...</p>
          </div>
        ) : (
          <ReviewList reviews={reviews} onEdit={handleEditReview} onDelete={handleDeleteReview} />
        )}
      </Card>
    </>
  )
}
