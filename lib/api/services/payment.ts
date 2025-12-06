import { paymentApi } from '../client'
import type { Payment, CreatePaymentRequest } from '../types'

export const paymentService = {
  // 결제 생성
  async createPayment(data: CreatePaymentRequest): Promise<Payment> {
    return paymentApi.post<Payment>('/api/payments', data)
  },

  // 결제 조회
  async getPayment(id: number): Promise<Payment> {
    return paymentApi.get<Payment>(`/api/payments/${id}`)
  },

  // 주문별 결제 조회
  async getPaymentByOrder(orderId: number): Promise<Payment> {
    return paymentApi.get<Payment>(`/api/payments/order/${orderId}`)
  },

  // 결제 취소
  async cancelPayment(id: number, reason?: string): Promise<Payment> {
    return paymentApi.post<Payment>(`/api/payments/${id}/cancel`, { reason })
  },

  // 결제 확인 (PG 콜백)
  async confirmPayment(transactionId: string): Promise<Payment> {
    return paymentApi.post<Payment>('/api/payments/confirm', { transactionId })
  },
}


