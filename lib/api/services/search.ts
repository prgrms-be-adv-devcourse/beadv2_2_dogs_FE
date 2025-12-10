import { searchApi } from '../client'
import type { SearchResult, SearchParams, Product, Experience, Farm } from '../types'

export const searchService = {
  // 통합 검색
  async search(params: SearchParams): Promise<SearchResult> {
    return searchApi.get<SearchResult>('/api/search', { params })
  },

  // 상품 검색
  async searchProducts(keyword: string, page?: number, size?: number): Promise<Product[]> {
    return searchApi.get<Product[]>('/api/search/products', { params: { keyword, page, size } })
  },

  // 체험 검색
  async searchExperiences(keyword: string, page?: number, size?: number): Promise<Experience[]> {
    return searchApi.get<Experience[]>('/api/search/experiences', {
      params: { keyword, page, size },
    })
  },

  // 농장 검색
  async searchFarms(keyword: string, page?: number, size?: number): Promise<Farm[]> {
    return searchApi.get<Farm[]>('/api/search/farms', { params: { keyword, page, size } })
  },

  // 인기 검색어 조회
  async getPopularKeywords(): Promise<string[]> {
    return searchApi.get<string[]>('/api/search/popular-keywords')
  },

  // 자동완성
  async getSuggestions(keyword: string): Promise<string[]> {
    return searchApi.get<string[]>('/api/search/suggestions', { params: { keyword } })
  },
}
