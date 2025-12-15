import { orderApi } from '../client'
import type { OrderCreateRequest, OrderDetailInfo } from '../types'

export const orderService = {
  // 주문 생성
  async createOrder(data: OrderCreateRequest): Promise<OrderDetailInfo> {
    return orderApi.post<OrderDetailInfo>('/api/v1/orders', data)
  },

  // 주문 상세 조회
  async getOrder(orderId: string): Promise<OrderDetailInfo> {
    return orderApi.get<OrderDetailInfo>(`/api/v1/orders/${orderId}`)
  },
}
