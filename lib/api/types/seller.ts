// 판매자 전환 시 요청
export interface SellerApplyRequestDto {
  storeName: string
  business_reg_no: string
  business_owner_name: string
  settlement_bank: string
  settlement_account: string
}

export interface SellerDashboard {
  totalSales: number
  totalOrders: number
  pendingOrders: number
  totalProducts: number
  totalExperiences: number
  recentOrders: Order[]
  salesByMonth: { month: string; sales: number }[]
}

export interface Settlement {
  id: number
  sellerId: number
  amount: number
  fee: number
  netAmount: number
  status: SettlementStatus
  period: { start: string; end: string }
  settledAt?: string
  createdAt: string
}

export type SettlementStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'

// Import Order for SellerDashboard
import type { Order } from './order'
