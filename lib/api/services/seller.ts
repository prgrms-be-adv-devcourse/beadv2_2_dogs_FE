import { sellerApi, settlementApi } from '../client'
import type {
  Product,
  Experience,
  Order,
  SellerDashboard,
  Settlement,
  PaginatedResponse,
  PaginationParams,
} from '../types'

export const sellerService = {
  // 대시보드 조회
  async getDashboard(): Promise<SellerDashboard> {
    return sellerApi.get<SellerDashboard>('/api/seller/dashboard')
  },

  // 판매자 상품 목록
  async getMyProducts(params?: PaginationParams): Promise<PaginatedResponse<Product>> {
    return sellerApi.get<PaginatedResponse<Product>>('/api/seller/products', { params })
  },

  // 상품 등록
  async createProduct(data: Partial<Product>): Promise<Product> {
    return sellerApi.post<Product>('/api/seller/products', data)
  },

  // 상품 수정
  async updateProduct(id: number, data: Partial<Product>): Promise<Product> {
    return sellerApi.put<Product>(`/api/seller/products/${id}`, data)
  },

  // 상품 삭제
  async deleteProduct(id: number): Promise<void> {
    return sellerApi.delete(`/api/seller/products/${id}`)
  },

  // 판매자 체험 목록
  async getMyExperiences(params?: PaginationParams): Promise<PaginatedResponse<Experience>> {
    return sellerApi.get<PaginatedResponse<Experience>>('/api/seller/experiences', { params })
  },

  // 체험 등록
  async createExperience(data: Partial<Experience>): Promise<Experience> {
    return sellerApi.post<Experience>('/api/seller/experiences', data)
  },

  // 체험 수정
  async updateExperience(id: number, data: Partial<Experience>): Promise<Experience> {
    return sellerApi.put<Experience>(`/api/seller/experiences/${id}`, data)
  },

  // 체험 삭제
  async deleteExperience(id: number): Promise<void> {
    return sellerApi.delete(`/api/seller/experiences/${id}`)
  },

  // 판매자 주문 목록
  async getMyOrders(
    params?: PaginationParams & { status?: string }
  ): Promise<PaginatedResponse<Order>> {
    return sellerApi.get<PaginatedResponse<Order>>('/api/seller/orders', { params })
  },

  // 주문 상태 변경
  async updateOrderStatus(orderId: number, status: string): Promise<Order> {
    return sellerApi.patch<Order>(`/api/seller/orders/${orderId}/status`, { status })
  },

  // 정산 목록 조회
  async getSettlements(params?: PaginationParams): Promise<PaginatedResponse<Settlement>> {
    return settlementApi.get<PaginatedResponse<Settlement>>('/api/settlements', { params })
  },

  // 정산 상세 조회
  async getSettlement(id: number): Promise<Settlement> {
    return settlementApi.get<Settlement>(`/api/settlements/${id}`)
  },
}


