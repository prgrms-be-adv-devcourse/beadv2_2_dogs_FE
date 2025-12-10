import { reviewApi } from '../client'
import type { Review, CreateReviewRequest, PaginatedResponse, PaginationParams } from '../types'

export const reviewService = {
  // 리뷰 목록 조회 (상품/체험/농장별)
  async getReviews(
    targetType: 'PRODUCT' | 'EXPERIENCE' | 'FARM',
    targetId: number,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Review>> {
    return reviewApi.get<PaginatedResponse<Review>>(`/api/reviews/${targetType}/${targetId}`, {
      params,
    })
  },

  // 리뷰 작성
  async createReview(data: CreateReviewRequest): Promise<Review> {
    return reviewApi.post<Review>('/api/reviews', data)
  },

  // 리뷰 수정
  async updateReview(id: number, data: Partial<CreateReviewRequest>): Promise<Review> {
    return reviewApi.put<Review>(`/api/reviews/${id}`, data)
  },

  // 리뷰 삭제
  async deleteReview(id: number): Promise<void> {
    return reviewApi.delete(`/api/reviews/${id}`)
  },

  // 리뷰 도움됨 표시
  async markHelpful(id: number): Promise<void> {
    return reviewApi.post(`/api/reviews/${id}/helpful`)
  },

  // 내 리뷰 목록 조회
  async getMyReviews(params?: PaginationParams): Promise<PaginatedResponse<Review>> {
    return reviewApi.get<PaginatedResponse<Review>>('/api/reviews/my', { params })
  },
}
