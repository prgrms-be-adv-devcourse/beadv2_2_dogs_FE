import { reviewApi, aiApi } from '../client'
import type {
  Review,
  ReviewCreateRequest,
  ReviewUpdateRequest,
  PaginatedResponse,
  PaginationParams,
} from '../types'

const unwrapData = <T>(response: unknown): T => {
  if (response && typeof response === 'object' && 'data' in response) {
    const data = (response as { data?: T }).data
    if (data !== undefined) return data
  }
  return response as T
}

export const reviewService = {
  // 상품 리뷰 목록 조회
  async getProductReviews(
    productId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Review>> {
    const response = await reviewApi.get<
      | { status?: number; data?: PaginatedResponse<Review> | null; message?: string | null }
      | PaginatedResponse<Review>
    >(`/api/v1/products/${productId}/reviews`, {
      params,
    })
    const data = unwrapData<PaginatedResponse<Review> | null>(response)
    if (!data) {
      return {
        content: [],
        totalElements: 0,
        totalPages: 0,
        page: params?.page ?? 0,
        size: params?.size ?? 20,
        hasNext: false,
        hasPrevious: false,
      }
    }
    return data
  },

  // 제품 리뷰 등록
  async createProductReview(
    productId: string,
    data: ReviewCreateRequest,
    images?: File[]
  ): Promise<Review> {
    const formData = new FormData()
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }))
    if (images && images.length > 0) {
      images.forEach((file) => formData.append('images', file))
    }
    const response = await reviewApi.post<
      { status?: number; data?: Review; message?: string | null } | Review
    >(`/api/v1/products/${productId}/reviews`, formData)
    return unwrapData<Review>(response)
  },

  // 내 리뷰 목록 조회
  async getMyReviews(params?: PaginationParams): Promise<PaginatedResponse<Review>> {
    const response = await reviewApi.get<
      | { status?: number; data?: PaginatedResponse<Review> | null; message?: string | null }
      | PaginatedResponse<Review>
    >('/api/v1/me/reviews', { params })
    const data = unwrapData<PaginatedResponse<Review> | null>(response)
    if (!data) {
      return {
        content: [],
        totalElements: 0,
        totalPages: 0,
        page: params?.page ?? 0,
        size: params?.size ?? 20,
        hasNext: false,
        hasPrevious: false,
      }
    }
    return data
  },

  // 리뷰 상세 조회
  async getReview(reviewId: string): Promise<Review> {
    const response = await reviewApi.get<
      { status?: number; data?: Review; message?: string | null } | Review
    >(`/api/v1/reviews/${reviewId}`)
    return unwrapData<Review>(response)
  },

  // 리뷰 수정
  async updateReview(
    reviewId: string,
    data: ReviewUpdateRequest,
    images?: File[]
  ): Promise<Review> {
    const formData = new FormData()
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }))
    if (data.imageUpdateMode === 'REPLACE' && images && images.length > 0) {
      images.forEach((file) => formData.append('images', file))
    }
    const response = await reviewApi.put<
      { status?: number; data?: Review; message?: string | null } | Review
    >(`/api/v1/reviews/${reviewId}`, formData)
    return unwrapData<Review>(response)
  },

  // 리뷰 삭제
  async deleteReview(reviewId: string): Promise<void> {
    await reviewApi.delete(`/api/v1/reviews/${reviewId}`)
  },

  // 상품 베스트 리뷰/요약 갱신 (전체 배치 실행)
  async refreshProductReviewSummary(productId: string): Promise<void> {
    await aiApi.post('/api/v1/reviews/batch/refresh-all')
  },
}
