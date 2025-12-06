// =====================
// Common Types
// =====================
export interface PaginatedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  page: number
  size: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface PaginationParams {
  page?: number
  size?: number
  sort?: string
}

// =====================
// Auth Types
// =====================
export interface User {
  id: number
  email: string
  name: string
  phone: string
  role: 'BUYER' | 'SELLER' | 'ADMIN'
  profileImage?: string
  createdAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export interface SignupRequest {
  email: string
  password: string
  name: string
  phone: string
}

export interface FarmerSignupRequest extends SignupRequest {
  farmName: string
  farmAddress: string
  farmDescription?: string
  businessNumber?: string
}

// =====================
// Product Types
// =====================
export interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  stock: number
  farmId: number
  farmName: string
  farmLocation: string
  rating: number
  reviewCount: number
  tags: string[]
  certification?: string
  weight?: string
  createdAt: string
}

export interface ProductListParams extends PaginationParams {
  category?: string
  minPrice?: number
  maxPrice?: number
  farmId?: number
  keyword?: string
}

// =====================
// Cart Types
// =====================
export interface CartItem {
  id: number
  productId: number
  productName: string
  productImage: string
  farmName: string
  price: number
  quantity: number
}

export interface Cart {
  id: number
  userId: number
  items: CartItem[]
  totalPrice: number
  totalItems: number
}

export interface AddToCartRequest {
  productId: number
  quantity: number
}

// =====================
// Order Types
// =====================
export interface OrderItem {
  id: number
  productId: number
  productName: string
  productImage: string
  price: number
  quantity: number
  subtotal: number
}

export interface Order {
  id: number
  orderNumber: string
  userId: number
  items: OrderItem[]
  totalPrice: number
  shippingFee: number
  finalPrice: number
  status: OrderStatus
  shippingAddress: Address
  paymentMethod: string
  createdAt: string
  updatedAt: string
}

export type OrderStatus =
  | 'PENDING'
  | 'PAID'
  | 'PREPARING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED'

export interface CreateOrderRequest {
  items: { productId: number; quantity: number }[]
  shippingAddressId: number
  paymentMethod: string
}

export interface Address {
  id: number
  name: string
  phone: string
  zipCode: string
  address: string
  detailAddress: string
  isDefault: boolean
}

// =====================
// Farm Types
// =====================
export interface Farm {
  id: number
  name: string
  description: string
  address: string
  images: string[]
  ownerId: number
  ownerName: string
  rating: number
  reviewCount: number
  productCount: number
  experienceCount: number
  certifications: string[]
  createdAt: string
}

// =====================
// Experience Types
// =====================
export interface Experience {
  id: number
  title: string
  description: string
  farmId: number
  farmName: string
  farmLocation: string
  images: string[]
  price: number
  duration: string
  maxParticipants: number
  availableDates: string[]
  category: string
  tags: string[]
  rating: number
  reviewCount: number
  createdAt: string
}

export interface ExperienceBooking {
  id: number
  experienceId: number
  experienceTitle: string
  userId: number
  date: string
  participants: number
  totalPrice: number
  status: BookingStatus
  createdAt: string
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'

export interface CreateBookingRequest {
  experienceId: number
  date: string
  participants: number
}

// =====================
// Review Types
// =====================
export interface Review {
  id: number
  userId: number
  userName: string
  userImage?: string
  targetType: 'PRODUCT' | 'EXPERIENCE' | 'FARM'
  targetId: number
  rating: number
  content: string
  images?: string[]
  helpfulCount: number
  createdAt: string
}

export interface CreateReviewRequest {
  targetType: 'PRODUCT' | 'EXPERIENCE' | 'FARM'
  targetId: number
  rating: number
  content: string
  images?: string[]
}

// =====================
// Payment Types
// =====================
export interface Payment {
  id: number
  orderId: number
  amount: number
  method: PaymentMethod
  status: PaymentStatus
  transactionId?: string
  paidAt?: string
  createdAt: string
}

export type PaymentMethod = 'CARD' | 'BANK_TRANSFER' | 'KAKAO_PAY' | 'NAVER_PAY' | 'TOSS'
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'REFUNDED'

export interface CreatePaymentRequest {
  orderId: number
  method: PaymentMethod
  amount: number
}

// =====================
// Delivery Types
// =====================
export interface Delivery {
  id: number
  orderId: number
  status: DeliveryStatus
  trackingNumber?: string
  carrier?: string
  estimatedDate?: string
  deliveredAt?: string
  history: DeliveryHistory[]
}

export type DeliveryStatus =
  | 'PENDING'
  | 'PICKED_UP'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'

export interface DeliveryHistory {
  status: DeliveryStatus
  location: string
  message: string
  timestamp: string
}

// =====================
// Search Types
// =====================
export interface SearchResult {
  products: Product[]
  experiences: Experience[]
  farms: Farm[]
  totalProducts: number
  totalExperiences: number
  totalFarms: number
}

export interface SearchParams {
  keyword: string
  type?: 'ALL' | 'PRODUCT' | 'EXPERIENCE' | 'FARM'
  page?: number
  size?: number
}

// =====================
// Notification Types
// =====================
export interface Notification {
  id: number
  userId: number
  type: NotificationType
  title: string
  message: string
  data?: Record<string, unknown>
  isRead: boolean
  createdAt: string
}

export type NotificationType =
  | 'ORDER_STATUS'
  | 'DELIVERY_STATUS'
  | 'PAYMENT'
  | 'PROMOTION'
  | 'REVIEW'
  | 'SYSTEM'

// =====================
// Seller Types
// =====================
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


