import { farmApi } from '../client'
import type { Farm, PaginatedResponse, PaginationParams } from '../types'

export const farmService = {
  // 농장 목록 조회
  async getFarms(
    params?: PaginationParams & { keyword?: string; location?: string }
  ): Promise<PaginatedResponse<Farm>> {
    return farmApi.get<PaginatedResponse<Farm>>('/api/farms', { params })
  },

  // 농장 상세 조회
  async getFarm(id: number): Promise<Farm> {
    return farmApi.get<Farm>(`/api/farms/${id}`)
  },

  // 인기 농장 조회
  async getPopularFarms(limit?: number): Promise<Farm[]> {
    return farmApi.get<Farm[]>('/api/farms/popular', { params: { limit } })
  },

  // 근처 농장 조회
  async getNearbyFarms(lat: number, lng: number, radius?: number): Promise<Farm[]> {
    return farmApi.get<Farm[]>('/api/farms/nearby', { params: { lat, lng, radius } })
  },
}


