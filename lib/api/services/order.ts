import { orderApi } from '../client'
import type {
  OrderDetailInfo,
  OrderCreateRequest,
  OrderCancelInfo,
  PaginatedResponse,
  PaginationParams,
} from '../types'

export const orderService = {
  // 주문 목록 조회
  async getOrders(params?: PaginationParams): Promise<PaginatedResponse<OrderDetailInfo>> {
    return orderApi.get<PaginatedResponse<OrderDetailInfo>>('/orders', { params })
  },

  // 주문 생성
  async createOrder(data: OrderCreateRequest): Promise<OrderDetailInfo> {
    return orderApi.post<OrderDetailInfo>('/orders', data)
  },

  // 주문 상세 조회
  async getOrder(orderId: string): Promise<OrderDetailInfo> {
    return orderApi.get<OrderDetailInfo>(`/orders/${orderId}`)
  },

  // 주문 취소
  async cancelOrder(orderId: string, cancelInfo?: OrderCancelInfo): Promise<OrderCancelInfo> {
    return orderApi.put<OrderCancelInfo>(`/orders/${orderId}/cancel`, cancelInfo || {})
  },
}
