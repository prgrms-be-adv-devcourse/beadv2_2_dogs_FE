// =====================
// Review Types
// =====================
export type ReviewVisibility = 'PUBLIC' | 'PRIVATE'
export type ReviewStatus = 'ACTIVE' | 'DELETED' | 'HIDDEN'

export interface ReviewCreateRequest {
  orderItemId: string // UUID
  rating: number // 1-5
  reviewVisibility: ReviewVisibility
  content: string
}

export interface ReviewUpdateRequest {
  rating?: number
  reviewVisibility?: ReviewVisibility
  content?: string
  imageUpdateMode?: 'KEEP' | 'REPLACE' | 'CLEAR'
}

export interface Review {
  id: string // UUID
  orderItemId?: string // UUID
  buyerId?: string // UUID
  productId?: string // UUID
  rating: number
  status?: ReviewStatus
  content: string
  reviewVisibility?: ReviewVisibility
  imageUrls?: string[]
  createdAt?: string
  updatedAt?: string
  // legacy fields (optional)
  userId?: number | string
  userName?: string
  userImage?: string
  targetType?: 'PRODUCT' | 'EXPERIENCE' | 'FARM'
  targetId?: number | string
  images?: string[]
  helpfulCount?: number
}
