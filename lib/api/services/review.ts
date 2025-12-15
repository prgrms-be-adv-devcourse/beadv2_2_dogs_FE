import { reviewApi } from '../client'
import type {
  Review,
  ReviewCreateRequest,
  ReviewUpdateRequest,
  PaginatedResponse,
  PaginationParams,
} from '../types'

export const reviewService = {
  // 상품 리뷰 목록 조회
  async getProductReviews(
    productId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Review>> {
    return reviewApi.get<PaginatedResponse<Review>>(`/products/${productId}/reviews`, { params })
  },

  // 제품 리뷰 등록
  async createProductReview(productId: string, data: ReviewCreateRequest): Promise<Review> {
    return reviewApi.post<Review>(`/products/${productId}/reviews`, data)
  },

  // 내 리뷰 목록 조회
  async getMyReviews(params?: PaginationParams): Promise<PaginatedResponse<Review>> {
    return reviewApi.get<PaginatedResponse<Review>>('/me/reviews', { params })
  },

  // 리뷰 상세 조회
  async getReview(reviewId: string): Promise<Review> {
    return reviewApi.get<Review>(`/reviews/${reviewId}`)
  },

  // 리뷰 수정
  async updateReview(reviewId: string, data: ReviewUpdateRequest): Promise<Review> {
    return reviewApi.put<Review>(`/reviews/${reviewId}`, data)
  },

  // 리뷰 삭제
  async deleteReview(reviewId: string): Promise<void> {
    return reviewApi.delete(`/reviews/${reviewId}`)
  },
}
