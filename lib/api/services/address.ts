import { buyerApi } from '../client'
import type { Address } from '../types'

export interface CreateAddressRequest {
  name: string
  phone: string
  zipCode: string
  address: string
  detailAddress: string
  isDefault?: boolean
}

export interface UpdateAddressRequest {
  name?: string
  phone?: string
  zipCode?: string
  address?: string
  detailAddress?: string
  isDefault?: boolean
}

// 주소 관련 API는 현재 Buyer Service에 없음
// 필요시 추가 예정
export const addressService = {
  // TODO: 주소 API가 Buyer Service에 추가되면 구현
}
