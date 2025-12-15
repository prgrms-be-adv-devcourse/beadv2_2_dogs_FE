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

// Request Types
export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  email: string
  password: string
  name: string
  phone: string
  marketingConsent?: boolean
}

export interface FarmerSignupRequest extends SignupRequest {
  farmName: string
  farmAddress: string
  farmDescription?: string
  businessNumber?: string
}

export interface SendCodeRequest {
  email: string
}

export interface VerifyCodeRequest {
  email: string
  code: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetConfirmRequest {
  email: string
  code: string
  newPassword: string
}

export interface PasswordChangeRequest {
  currentPassword: string
  newPassword: string
}

export interface LogoutRequest {
  refreshToken?: string
}

// Response Types
export interface LoginResult {
  userId: string // UUID
  email: string
  accessToken: string
  refreshToken: string
}

export interface SignUpResult {
  userId: string // UUID
  email: string
  accessToken: string
  refreshToken: string
}

export interface TokenResult {
  userId: string // UUID
  email: string
  accessToken: string
  refreshToken: string
}

export interface MeResponse {
  userId: string // UUID
  email: string
  role: string
}

// Legacy types for backward compatibility
export interface LoginResponse extends LoginResult {
  user?: User // Optional for backward compatibility
}

// =====================
// Product Types
// =====================
export type ProductCategory = 'FRUIT' | 'VEGETABLE' | 'GRAIN' | 'NUT' | 'ROOT' | 'MUSHROOM' | 'ETC'
export type ProductStatus = 'ON_SALE' | 'DISCOUNTED' | 'SOLD_OUT' | 'HIDDEN' | 'DELETED'

export interface Product {
  id: string // UUID
  sellerId: string // UUID
  productName: string
  description: string
  productCategory: ProductCategory
  price: number
  stockQuantity: number
  productStatus: ProductStatus
  imageUrls: string[]
  createdAt: string
  updatedAt: string
  // Legacy fields for backward compatibility
  name?: string
  images?: string[]
  category?: string
  stock?: number
  farmId?: number
  farmName?: string
  farmLocation?: string
  rating?: number
  reviewCount?: number
}

export interface ProductCreateRequest {
  productName: string
  description?: string
  productCategory: ProductCategory
  price: number
  stockQuantity: number
  productStatus?: ProductStatus
  imageUrls?: string[]
}

export interface ProductUpdateRequest {
  productName?: string
  description?: string
  productCategory?: ProductCategory
  price?: number
  stockQuantity?: number
  productStatus?: ProductStatus
  imageUrls?: string[]
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
export interface CartItemInfo {
  itemId: string // UUID
  productId: string // UUID
  quantity: number
  unitPrice: number
  productName?: string // Optional for display
  productImage?: string // Optional for display
}

export interface CartInfo {
  cartId: string // UUID
  buyerId: string // UUID
  items: CartItemInfo[]
  totalPrice: number
  createdAt: string
  updatedAt: string
}

export interface AddItemRequest {
  productId: string // UUID
  quantity: number
}

export interface UpdateQuantityRequest {
  quantity: number
}

export interface UpdateOptionRequest {
  // Option fields to be defined based on backend
  [key: string]: unknown
}

// Legacy types for backward compatibility
export interface CartItem extends CartItemInfo {
  id?: number
  productName: string
  productImage: string
  farmName?: string
  price: number
}

export interface Cart extends CartInfo {
  id?: number
  userId?: number
  totalItems?: number
}

export interface AddToCartRequest extends AddItemRequest {
  productId: number | string
}

// =====================
// Order Types
// =====================
export type OrderStatus = 'PENDING' | 'PAID' | 'CANCELED'

export interface OrderItemRequest {
  productId: string // UUID
  sellerId: string // UUID
  quantity: number
  unitPrice?: number
}

export interface OrderCreateRequest {
  receiverName: string
  phone: string
  email: string
  zipCode: string
  address: string
  addressDetail: string
  deliveryMemo?: string
  items: OrderItemRequest[]
}

export interface OrderDetailInfo {
  orderId: string // UUID
  totalAmount: number
  receiverName: string
  phone: string
  email: string
  zipCode: string
  address: string
  addressDetail: string
  deliveryMemo?: string
  status: OrderStatus
  // Additional fields may exist
  items?: OrderItem[]
  createdAt?: string
  updatedAt?: string
}

export interface OrderCancelInfo {
  orderId: string // UUID
  cancelReason?: string
  canceledAt?: string
}

// Legacy types for backward compatibility
export interface OrderItem {
  id?: number
  productId: number | string
  productName?: string
  productImage?: string
  price: number
  quantity: number
  subtotal?: number
}

export interface Order extends OrderDetailInfo {
  id?: number
  orderNumber?: string
  userId?: number
  shippingFee?: number
  finalPrice?: number
  shippingAddress?: Address
  paymentMethod?: string
}

export interface CreateOrderRequest {
  items: { productId: number | string; quantity: number }[]
  shippingAddressId?: number
  paymentMethod?: string
}

export interface Address {
  receiverName: string
  receiverPhone: string
  postalCode: string
  addressLine1: string
  addressLine2?: string
  // Legacy fields for backward compatibility
  id?: number
  name?: string
  phone?: string
  zipCode?: string
  address?: string
  detailAddress?: string
  isDefault?: boolean
}

// =====================
// Farm Types
// =====================
export interface FarmCreateRequestDto {
  name: string
  description: string
  address: string
  phone: string
}

export interface FarmUpdateRequestDto {
  name?: string
  description?: string
  address?: string
  phone?: string
}

export interface SellerApplyRequestDto {
  storeName: string
  // Additional fields may exist
  [key: string]: unknown
}

export interface Farm {
  id: string // UUID (may be number in some cases)
  name: string
  description: string
  address: string
  phone?: string
  images?: string[]
  ownerId?: number | string
  ownerName?: string
  rating?: number
  reviewCount?: number
  productCount?: number
  experienceCount?: number
  certifications?: string[]
  createdAt?: string
}

// =====================
// Experience Types
// =====================
export type ExperienceStatus = 'ON_SALE' | 'CLOSED'

export interface ExperienceCreateRequest {
  farmId: string // UUID
  title: string
  description: string
  pricePerPerson: number
  capacity: number
  durationMinutes: number
  availableStartDate: string // ISO date-time
  availableEndDate: string // ISO date-time
  status?: ExperienceStatus
}

export interface ExperienceUpdateRequest {
  title?: string
  description?: string
  pricePerPerson?: number
  capacity?: number
  durationMinutes?: number
  availableStartDate?: string
  availableEndDate?: string
  status?: ExperienceStatus
}

export interface Experience {
  id: string // UUID
  farmId: string // UUID
  title: string
  description: string
  pricePerPerson: number
  capacity: number
  durationMinutes: number
  availableStartDate: string
  availableEndDate: string
  status: ExperienceStatus
  // Legacy fields for backward compatibility
  price?: number
  duration?: string
  maxParticipants?: number
  availableDates?: string[]
  category?: string
  tags?: string[]
  rating?: number
  reviewCount?: number
  createdAt?: string
  images?: string[]
  farmName?: string
  farmLocation?: string
}

export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'

export interface ReservationRequest {
  experienceId: string // UUID
  buyerId: string // UUID
  reservedDate: string // date format: YYYY-MM-DD
  reservedTimeSlot: string
  headCount: number
  totalPrice: number
}

export interface ExperienceBooking {
  id: string // UUID (reservationId)
  experienceId: string // UUID
  experienceTitle?: string
  userId?: string // UUID
  buyerId?: string // UUID
  date?: string
  reservedDate?: string
  reservedTimeSlot?: string
  participants?: number
  headCount?: number
  totalPrice: number
  status: ReservationStatus
  createdAt?: string
}

// Legacy types for backward compatibility
export type BookingStatus = ReservationStatus

export interface CreateBookingRequest {
  experienceId: string
  date: string
  participants: number
}

// =====================
// Review Types
// =====================
export type ReviewVisibility = 'PUBLIC' | 'PRIVATE'

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
}

export interface Review {
  id: string // UUID (reviewId)
  orderItemId?: string // UUID
  userId?: number | string
  userName?: string
  userImage?: string
  targetType?: 'PRODUCT' | 'EXPERIENCE' | 'FARM'
  targetId?: number | string
  productId?: string // UUID
  rating: number
  content: string
  reviewVisibility?: ReviewVisibility
  images?: string[]
  helpfulCount?: number
  createdAt?: string
}

// =====================
// Payment Types
// =====================
export interface TossPaymentConfirmRequest {
  paymentKey: string
  orderId: string
  amount: number
}

export interface TossPaymentRefundRequest {
  paymentKey: string
  cancelReason: string
  cancelAmount?: number
}

export interface DepositChargeCreateRequest {
  amount: number
}

export interface DepositPaymentRequest {
  orderId: string // UUID
  amount: number
}

export interface DepositRefundRequest {
  orderId: string // UUID
  amount?: number
}

// Legacy types for backward compatibility
export interface Payment {
  id?: number
  orderId: number | string
  amount: number
  method?: PaymentMethod
  status?: PaymentStatus
  transactionId?: string
  paidAt?: string
  createdAt?: string
}

export type PaymentMethod = 'CARD' | 'BANK_TRANSFER' | 'KAKAO_PAY' | 'NAVER_PAY' | 'TOSS'
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'REFUNDED'

export interface CreatePaymentRequest {
  orderId: number | string
  method?: PaymentMethod
  amount: number
}

// =====================
// Delivery Types
// =====================
export type DeliveryStatus = 'READY' | 'SHIPPED' | 'DELIVERING' | 'DELIVERED'

export interface ShipDeliveryRequest {
  courier?: string
  trackingNumber?: string
}

export interface DeliveryDetailInfo {
  deliveryId: string // UUID
  orderId: string // UUID
  deliveryStatus: DeliveryStatus
  courier?: string
  trackingNumber?: string
  address?: Address
  shippedAt?: string // ISO date-time
  deliveredAt?: string // ISO date-time
}

// Legacy type for backward compatibility
export interface Delivery extends DeliveryDetailInfo {
  id?: number | string
  status?: DeliveryStatus
  carrier?: string
  estimatedDate?: string
  history?: DeliveryHistory[]
}

export interface DeliveryHistory {
  status: DeliveryStatus
  location?: string
  message?: string
  timestamp: string
}

// =====================
// Search Types
// =====================
export interface ProductSearchItem {
  productId: string // UUID
  productName: string
  price: number
  imageUrl?: string
}

export interface FarmSearchItem {
  farmId: string // UUID
  farmName: string
  address?: string
  imageUrl?: string
}

export interface ExperienceSearchItem {
  experienceId: string // UUID
  title: string
  pricePerPerson: number
  imageUrl?: string
}

export interface UnifiedSearchResponse {
  products: {
    content: ProductSearchItem[]
    totalElements: number
    totalPages: number
    page: number
    size: number
  }
  farms: {
    content: FarmSearchItem[]
    totalElements: number
    totalPages: number
    page: number
    size: number
  }
  experiences: {
    content: ExperienceSearchItem[]
    totalElements: number
    totalPages: number
    page: number
    size: number
  }
}

export interface ProductAutoItem {
  productId: string // UUID
  productName: string
}

export interface FarmAutoItem {
  farmId: string // UUID
  farmName: string
}

export interface ExperienceAutoItem {
  experienceId: string // UUID
  title: string
}

export interface UnifiedAutoCompleteResponse {
  products: ProductAutoItem[]
  farms: FarmAutoItem[]
  experiences: ExperienceAutoItem[]
}

export interface SearchParams {
  keyword: string
  type?: 'ALL' | 'PRODUCT' | 'EXPERIENCE' | 'FARM'
  page?: number
  size?: number
}

// Legacy type for backward compatibility
export interface SearchResult {
  products: Product[]
  experiences: Experience[]
  farms: Farm[]
  totalProducts: number
  totalExperiences: number
  totalFarms: number
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
