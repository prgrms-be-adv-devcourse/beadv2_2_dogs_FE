// API Service URLs Configuration
// 백엔드 모듈/포트 매핑:
// - eureka       : 8761 (Service Registry)
// - config       : 8888 (Config Server)
// - gateway      : 8080 (API Gateway) - 모든 요청은 Gateway를 통해 라우팅
// - baro-auth    : 8081 (auth)
// - baro-buyer   : 8082 (buyer, cart, product)
// - baro-seller  : 8085 (seller, farm)
// - baro-order   : 8087 (order, payment)
// - baro-support : 8089 (settlement, delivery, notification, experience, search, review)

// export const API_URLS = {
//   // Auth Module
//   AUTH: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:8081',

//   // Buyer Module (buyer, cart, product → baro-buyer:8082)
//   BUYER: process.env.NEXT_PUBLIC_BUYER_SERVICE_URL || 'http://localhost:8082',
//   CART: process.env.NEXT_PUBLIC_CART_SERVICE_URL || 'http://localhost:8082',
//   PRODUCT: process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL || 'http://localhost:8082',

//   // Seller Module (seller, farm → baro-seller:8085)
//   SELLER: process.env.NEXT_PUBLIC_SELLER_SERVICE_URL || 'http://localhost:8085',
//   FARM: process.env.NEXT_PUBLIC_FARM_SERVICE_URL || 'http://localhost:8085',

//   // Order Module (order, payment → baro-order:8087)
//   ORDER: process.env.NEXT_PUBLIC_ORDER_SERVICE_URL || 'http://localhost:8087',
//   PAYMENT: process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL || 'http://localhost:8087',

//   // Support Module (모두 baro-support:8089)
//   SETTLEMENT: process.env.NEXT_PUBLIC_SETTLEMENT_SERVICE_URL || 'http://localhost:8089',
//   DELIVERY: process.env.NEXT_PUBLIC_DELIVERY_SERVICE_URL || 'http://localhost:8089',
//   NOTIFICATION: process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE_URL || 'http://localhost:8089',
//   EXPERIENCE: process.env.NEXT_PUBLIC_EXPERIENCE_SERVICE_URL || 'http://localhost:8089',
//   SEARCH: process.env.NEXT_PUBLIC_SEARCH_SERVICE_URL || 'http://localhost:8089',
//   REVIEW: process.env.NEXT_PUBLIC_REVIEW_SERVICE_URL || 'http://localhost:8089',
// } as const

const GATEWAY_BASE = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8080'

export const API_URLS = {
  // Auth Service
  AUTH: `${GATEWAY_BASE}/auth-service/api/v1`,

  // Buyer Service (상품, 장바구니, 재고)
  BUYER: `${GATEWAY_BASE}/buyer-service/api/v1`,
  CART: `${GATEWAY_BASE}/buyer-service/api/v1`,
  PRODUCT: `${GATEWAY_BASE}/buyer-service/api/v1`,

  // Seller Service (판매자, 농장)
  SELLER: `${GATEWAY_BASE}/seller-service/api/v1`,
  FARM: `${GATEWAY_BASE}/seller-service/api/v1`,

  // Order Service (주문, 결제, 예치금)
  ORDER: `${GATEWAY_BASE}/order-service/api/v1`,
  PAYMENT: `${GATEWAY_BASE}/order-service/api/v1`,

  // Support Service (체험, 예약, 리뷰, 배송, 검색, 정산, 알림)
  SETTLEMENT: `${GATEWAY_BASE}/support-service/api/v1`,
  DELIVERY: `${GATEWAY_BASE}/support-service/api/v1`,
  NOTIFICATION: `${GATEWAY_BASE}/support-service/api/v1`,
  EXPERIENCE: `${GATEWAY_BASE}/support-service/api/v1`,
  SEARCH: `${GATEWAY_BASE}/support-service/api/v1`,
  REVIEW: `${GATEWAY_BASE}/support-service/api/v1`,
} as const

// 그리고 .env.local에:
// NEXT_PUBLIC_GATEWAY_URL=http://localhost:8080

export type ServiceName = keyof typeof API_URLS
