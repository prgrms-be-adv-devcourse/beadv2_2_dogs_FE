# BaroFarm API 문서

이 문서는 BaroFarm 백엔드 서비스의 모든 API 엔드포인트를 정리한 문서입니다.

**Base URL**: `http://3.34.14.73:8080` (또는 `http://localhost:8080`)

---

## 목차

1. [Auth Service](#auth-service)
2. [Buyer Service](#buyer-service)
3. [Seller Service](#seller-service)
4. [Order Service](#order-service)
5. [Support Service](#support-service)

---

## Auth Service

**서비스 경로**: `/auth-service/api/v1`  
**스웨거**: http://3.34.14.73:8080/swagger-ui/index.html?urls.primaryName=Auth+Service

### Email Verification (이메일 인증)

#### 1. 인증코드 발송

- **Method**: `POST`
- **Endpoint**: `/auth-service/api/v1/auth/verification/email/send-code`
- **Description**: 이메일 인증코드 발송
- **Request Body**: `SendCodeRequest`
- **Response**: 성공/실패 응답

#### 2. 인증코드 검증

- **Method**: `POST`
- **Endpoint**: `/auth-service/api/v1/auth/verification/email/verify-code`
- **Description**: 이메일 인증코드 검증
- **Request Body**: `VerifyCodeRequest`
- **Response**: 성공/실패 응답

### Auth (인증/인가)

#### 3. 회원가입

- **Method**: `POST`
- **Endpoint**: `/auth-service/api/v1/auth/signup`
- **Description**: 회원가입
- **Request Body**: `SignupRequest`
- **Response**: `SignUpResult`

#### 4. 로그인

- **Method**: `POST`
- **Endpoint**: `/auth-service/api/v1/auth/login`
- **Description**: 로그인
- **Request Body**: `LoginRequest`
- **Response**: `LoginResult` (토큰 포함)

#### 5. 리프레시 토큰 재발급

- **Method**: `POST`
- **Endpoint**: `/auth-service/api/v1/auth/refresh`
- **Description**: 리프레시 토큰을 사용하여 새로운 액세스 토큰 발급
- **Request Body**: `RefreshTokenRequest`
- **Response**: `TokenResult`

#### 6. 로그아웃

- **Method**: `POST`
- **Endpoint**: `/auth-service/api/v1/auth/logout`
- **Description**: 로그아웃
- **Request Body**: `LogoutRequest`
- **Response**: 성공/실패 응답
- **Authentication**: Required

#### 7. 내 정보 조회

- **Method**: `GET`
- **Endpoint**: `/auth-service/api/v1/auth/me`
- **Description**: 현재 로그인한 사용자의 정보 조회
- **Response**: `MeResponse`
- **Authentication**: Required

#### 8. 비밀번호 재설정 코드 발송

- **Method**: `POST`
- **Endpoint**: `/auth-service/api/v1/auth/password/reset/request`
- **Description**: 비밀번호 재설정을 위한 인증코드 발송
- **Request Body**: `PasswordResetRequest`
- **Response**: 성공/실패 응답

#### 9. 비밀번호 재설정 완료

- **Method**: `POST`
- **Endpoint**: `/auth-service/api/v1/auth/password/reset/confirm`
- **Description**: 인증코드 확인 후 비밀번호 재설정
- **Request Body**: `PasswordResetConfirmRequest`
- **Response**: 성공/실패 응답

#### 10. 비밀번호 변경

- **Method**: `POST`
- **Endpoint**: `/auth-service/api/v1/auth/password/change`
- **Description**: 로그인한 사용자의 비밀번호 변경
- **Request Body**: `PasswordChangeRequest`
- **Response**: 성공/실패 응답
- **Authentication**: Required

#### 11. 판매자 권한 부여

- **Method**: `POST`
- **Endpoint**: `/auth-service/api/v1/auth/{userId}/grant-seller`
- **Description**: 특정 사용자에게 판매자 권한 부여
- **Path Parameters**:
  - `userId`: 사용자 ID
- **Response**: 성공/실패 응답
- **Authentication**: Required (관리자 권한 필요할 수 있음)

---

## Buyer Service

**서비스 경로**: `/buyer-service/api/v1`  
**스웨거**: http://3.34.14.73:8080/swagger-ui/index.html?urls.primaryName=Buyer+Service

### Product Controller (상품 관리)

#### 1. 상품 목록 조회

- **Method**: `GET`
- **Endpoint**: `/buyer-service/api/v1/products`
- **Description**: 상품 모두 조회 API (페이지네이션 지원)
- **Query Parameters**: `Pageable` (page, size, sort 등)
- **Response**: `ResponseDto<CustomPage<ProductDetailInfo>>`

#### 2. 상품 생성

- **Method**: `POST`
- **Endpoint**: `/buyer-service/api/v1/products`
- **Description**: 새로운 상품 생성
- **Request Body**: `ProductCreateRequest`
- **Response**: `ResponseDto<ProductDetailInfo>`
- **Authentication**: Required

#### 3. 상품 상세 조회

- **Method**: `GET`
- **Endpoint**: `/buyer-service/api/v1/products/{id}`
- **Description**: 특정 상품의 상세 정보 조회
- **Path Parameters**:
  - `id`: 상품 ID
- **Response**: `ResponseDto<ProductDetailInfo>`

#### 4. 상품 수정

- **Method**: `PATCH`
- **Endpoint**: `/buyer-service/api/v1/products/{id}`
- **Description**: 기존 상품 정보 수정
- **Path Parameters**:
  - `id`: 상품 ID
- **Request Body**: `ProductUpdateRequest`
- **Response**: `ResponseDto<Void>`
- **Authentication**: Required

#### 5. 상품 삭제

- **Method**: `DELETE`
- **Endpoint**: `/buyer-service/api/v1/products/{id}`
- **Description**: 상품 삭제
- **Path Parameters**:
  - `id`: 상품 ID
- **Response**: `ResponseDto<Void>`
- **Authentication**: Required

### 장바구니 API

#### 6. 장바구니 조회

- **Method**: `GET`
- **Endpoint**: `/buyer-service/api/v1/carts`
- **Description**: 페이징 없이 장바구니 조회
- **Response**: `ResponseDto<CartInfo>`
- **Authentication**: Required

#### 7. 장바구니에 상품 추가

- **Method**: `POST`
- **Endpoint**: `/buyer-service/api/v1/carts/items`
- **Description**: 장바구니에 상품 추가
- **Request Body**: `AddItemRequest`
- **Response**: `ResponseDto<CartItemInfo>`
- **Authentication**: Required

#### 8. 장바구니 항목 수량 변경

- **Method**: `PATCH`
- **Endpoint**: `/buyer-service/api/v1/carts/items/{itemId}/quantity`
- **Description**: 장바구니 항목 수량 변경
- **Path Parameters**:
  - `itemId`: 장바구니 항목 ID
- **Request Body**: `UpdateQuantityRequest`
- **Response**: `ResponseDto<CartItemInfo>`
- **Authentication**: Required

#### 9. 장바구니 항목 옵션 변경

- **Method**: `PATCH`
- **Endpoint**: `/buyer-service/api/v1/carts/items/{itemId}/option`
- **Description**: 장바구니 항목 옵션 변경
- **Path Parameters**:
  - `itemId`: 장바구니 항목 ID
- **Request Body**: `UpdateOptionRequest`
- **Response**: `ResponseDto<CartItemInfo>`
- **Authentication**: Required

#### 10. 장바구니 항목 삭제

- **Method**: `DELETE`
- **Endpoint**: `/buyer-service/api/v1/carts/items/{itemId}`
- **Description**: 장바구니 항목 삭제
- **Path Parameters**:
  - `itemId`: 장바구니 항목 ID
- **Response**: `ResponseDto<Void>`
- **Authentication**: Required

#### 11. 장바구니 비우기

- **Method**: `DELETE`
- **Endpoint**: `/buyer-service/api/v1/carts`
- **Description**: 장바구니 비우기
- **Response**: `ResponseDto<Void>`
- **Authentication**: Required

#### 12. 비로그인 장바구니 병합

- **Method**: `POST`
- **Endpoint**: `/buyer-service/api/v1/carts/merge`
- **Description**: 비로그인 장바구니를 로그인 사용자 장바구니로 병합
- **Request Body**: `CartMergeRequest`
- **Response**: `ResponseDto<CartInfo>`
- **Authentication**: Required

### Inventory (재고 관리)

#### 13. 재고 증가

- **Method**: `POST`
- **Endpoint**: `/buyer-service/api/v1/inventories/increase`
- **Description**: 재고 증가
- **Request Body**: `InventoryIncreaseRequest`
- **Response**: `ResponseDto<Void>`
- **Authentication**: Required

#### 14. 재고 차감

- **Method**: `POST`
- **Endpoint**: `/buyer-service/api/v1/inventories/decrease`
- **Description**: 재고 차감
- **Request Body**: `InventoryDecreaseRequest`
- **Response**: `ResponseDto<Void>`
- **Authentication**: Required

---

## Seller Service

**서비스 경로**: `/seller-service/api/v1`  
**스웨거**: http://3.34.14.73:8080/swagger-ui/index.html?urls.primaryName=Seller+Service

### Farm (농장 관리)

#### 1. 농장 목록 조회

- **Method**: `GET`
- **Endpoint**: `/seller-service/api/v1/farms`
- **Description**: 농장 목록 조회 (페이지네이션 지원)
- **Query Parameters**: `Pageable` (page, size, sort 등)
- **Response**: 페이지네이션된 농장 목록

#### 2. 농장 정보 등록

- **Method**: `POST`
- **Endpoint**: `/seller-service/api/v1/farms`
- **Description**: 새로운 농장 정보 등록
- **Request Body**: `FarmCreateRequestDto`
- **Response**: 농장 정보 응답
- **Authentication**: Required

#### 3. 농장 정보 상세 조회

- **Method**: `GET`
- **Endpoint**: `/seller-service/api/v1/farms/{id}`
- **Description**: 특정 농장의 상세 정보 조회
- **Path Parameters**:
  - `id`: 농장 ID
- **Response**: 농장 상세 정보

#### 4. 농장 정보 수정

- **Method**: `PUT`
- **Endpoint**: `/seller-service/api/v1/farms/{id}`
- **Description**: 기존 농장 정보 수정
- **Path Parameters**:
  - `id`: 농장 ID
- **Request Body**: `FarmUpdateRequestDto`
- **Response**: 수정된 농장 정보
- **Authentication**: Required

#### 5. 농장 삭제

- **Method**: `DELETE`
- **Endpoint**: `/seller-service/api/v1/farms/{id}`
- **Description**: 농장 삭제
- **Path Parameters**:
  - `id`: 농장 ID
- **Response**: 성공/실패 응답
- **Authentication**: Required

### Seller Controller (판매자 관리)

#### 6. 판매자 신청

- **Method**: `POST`
- **Endpoint**: `/seller-service/api/v1/sellers/apply`
- **Description**: 판매자 신청
- **Request Body**: `SellerApplyRequestDto`
- **Response**: 성공/실패 응답
- **Authentication**: Required

---

## Order Service

**서비스 경로**: `/order-service/api/v1`  
**스웨거**: http://3.34.14.73:8080/swagger-ui/index.html?urls.primaryName=Order+Service

### Order (주문 관리)

#### 1. 주문 목록 조회

- **Method**: `GET`
- **Endpoint**: `/order-service/api/v1/orders`
- **Description**: 주문 목록 조회 (페이지네이션 지원)
- **Query Parameters**: `Pageable` (page, size, sort 등)
- **Response**: 페이지네이션된 주문 목록
- **Authentication**: Required

#### 2. 주문 생성

- **Method**: `POST`
- **Endpoint**: `/order-service/api/v1/orders`
- **Description**: 주문 생성
- **Request Body**: `OrderCreateRequest`
- **Response**: `ResponseDto<OrderDetailInfo>`
- **Authentication**: Required

#### 3. 주문 상세 조회

- **Method**: `GET`
- **Endpoint**: `/order-service/api/v1/orders/{orderId}`
- **Description**: 주문 상세 조회
- **Path Parameters**:
  - `orderId`: 주문 ID
- **Response**: `ResponseDto<OrderDetailInfo>`
- **Authentication**: Required

#### 4. 주문 취소

- **Method**: `PUT`
- **Endpoint**: `/order-service/api/v1/orders/{orderId}/cancel`
- **Description**: 주문 취소
- **Path Parameters**:
  - `orderId`: 주문 ID
- **Request Body**: `OrderCancelInfo`
- **Response**: `ResponseDto<OrderCancelInfo>`
- **Authentication**: Required

### Payment (결제 관리)

#### 5. 토스 결제 승인

- **Method**: `POST`
- **Endpoint**: `/order-service/api/v1/payments/toss/confirm`
- **Description**: 토스 결제 승인
- **Request Body**: `TossPaymentConfirmRequest`
- **Response**: 결제 정보
- **Authentication**: Required

#### 6. 토스 결제 환불

- **Method**: `POST`
- **Endpoint**: `/order-service/api/v1/payments/toss/refund`
- **Description**: 토스 결제 환불
- **Request Body**: `TossPaymentRefundRequest`
- **Response**: 환불 정보
- **Authentication**: Required

#### 7. 토스 예치금 충전 승인

- **Method**: `POST`
- **Endpoint**: `/order-service/api/v1/payments/toss/confirm/deposit`
- **Description**: 토스 예치금 충전 승인
- **Request Body**: `TossPaymentConfirmRequest`
- **Response**: 충전 정보
- **Authentication**: Required

### Deposit (예치금 관리)

#### 8. 예치금 조회

- **Method**: `GET`
- **Endpoint**: `/order-service/api/v1/deposits`
- **Description**: 예치금 조회
- **Response**: 예치금 정보
- **Authentication**: Required

#### 9. 예치금 충전 요청 생성

- **Method**: `POST`
- **Endpoint**: `/order-service/api/v1/deposits/charges`
- **Description**: 예치금 충전 요청 생성
- **Request Body**: `DepositChargeCreateRequest`
- **Response**: 충전 요청 정보
- **Authentication**: Required

#### 10. 예치금으로 주문 결제

- **Method**: `POST`
- **Endpoint**: `/order-service/api/v1/deposits/pay`
- **Description**: 예치금으로 주문 결제
- **Request Body**: `DepositPaymentRequest`
- **Response**: 결제 정보
- **Authentication**: Required

#### 11. 예치금 결제 환불

- **Method**: `POST`
- **Endpoint**: `/order-service/api/v1/deposits/refund`
- **Description**: 예치금 결제 환불
- **Request Body**: `DepositRefundRequest`
- **Response**: 환불 정보
- **Authentication**: Required

---

## Support Service

**서비스 경로**: `/support-service/api/v1`  
**스웨거**: http://3.34.14.73:8080/swagger-ui/index.html?urls.primaryName=Support+Service

### Experience (체험 프로그램 관리)

#### 1. 체험 프로그램 목록 조회

- **Method**: `GET`
- **Endpoint**: `/support-service/api/v1/experiences`
- **Description**: 체험 프로그램 목록 조회 (페이지네이션 지원)
- **Query Parameters**: `Pageable` (page, size, sort 등)
- **Response**: 페이지네이션된 체험 목록

#### 2. 체험 프로그램 등록

- **Method**: `POST`
- **Endpoint**: `/support-service/api/v1/experiences`
- **Description**: 체험 프로그램 등록
- **Request Body**: `ExperienceCreateRequest`
- **Response**: 체험 정보
- **Authentication**: Required

#### 3. 체험 프로그램 상세 조회

- **Method**: `GET`
- **Endpoint**: `/support-service/api/v1/experiences/{id}`
- **Description**: 체험 프로그램 상세 조회
- **Path Parameters**:
  - `id`: 체험 ID
- **Response**: 체험 상세 정보

#### 4. 체험 프로그램 수정

- **Method**: `PUT`
- **Endpoint**: `/support-service/api/v1/experiences/{id}`
- **Description**: 체험 프로그램 수정
- **Path Parameters**:
  - `id`: 체험 ID
- **Request Body**: `ExperienceUpdateRequest`
- **Response**: 수정된 체험 정보
- **Authentication**: Required

#### 5. 체험 프로그램 삭제

- **Method**: `DELETE`
- **Endpoint**: `/support-service/api/v1/experiences/{id}`
- **Description**: 체험 프로그램 삭제
- **Path Parameters**:
  - `id`: 체험 ID
- **Response**: 성공/실패 응답
- **Authentication**: Required

#### 6. 내 체험 프로그램 목록 조회

- **Method**: `GET`
- **Endpoint**: `/support-service/api/v1/experiences/my-farm`
- **Description**: 내 체험 프로그램 목록 조회
- **Response**: 체험 목록
- **Authentication**: Required

### Reservation (체험 예약 관리)

#### 7. 예약 등록

- **Method**: `POST`
- **Endpoint**: `/support-service/api/v1/reservations`
- **Description**: 예약 등록
- **Request Body**: `ReservationRequest`
- **Response**: 예약 정보
- **Authentication**: Required

#### 8. 예약 목록 조회

- **Method**: `GET`
- **Endpoint**: `/support-service/api/v1/reservations`
- **Description**: 예약 목록 조회 (페이지네이션 지원)
- **Query Parameters**: `Pageable` (page, size, sort 등)
- **Response**: 페이지네이션된 예약 목록
- **Authentication**: Required

#### 9. 예약 상세 조회

- **Method**: `GET`
- **Endpoint**: `/support-service/api/v1/reservations/{reservationId}`
- **Description**: 예약 상세 조회
- **Path Parameters**:
  - `reservationId`: 예약 ID
- **Response**: 예약 상세 정보
- **Authentication**: Required

#### 10. 예약 상태 변경

- **Method**: `PUT`
- **Endpoint**: `/support-service/api/v1/reservations/{reservationId}/status`
- **Description**: 예약 상태 변경
- **Path Parameters**:
  - `reservationId`: 예약 ID
- **Request Body**: 상태 변경 정보
- **Response**: 업데이트된 예약 정보
- **Authentication**: Required

#### 11. 예약 삭제

- **Method**: `DELETE`
- **Endpoint**: `/support-service/api/v1/reservations/{reservationId}`
- **Description**: 예약 삭제
- **Path Parameters**:
  - `reservationId`: 예약 ID
- **Response**: 성공/실패 응답
- **Authentication**: Required

### Product Reviews (제품 리뷰 관리)

#### 12. 상품 리뷰 목록 조회

- **Method**: `GET`
- **Endpoint**: `/support-service/api/v1/products/{productId}/reviews`
- **Description**: 상품 리뷰 목록 조회 (페이지네이션 지원)
- **Path Parameters**:
  - `productId`: 상품 ID
- **Query Parameters**: `Pageable` (page, size, sort 등)
- **Response**: 페이지네이션된 리뷰 목록

#### 13. 제품 리뷰 등록

- **Method**: `POST`
- **Endpoint**: `/support-service/api/v1/products/{productId}/reviews`
- **Description**: 제품 리뷰 등록
- **Path Parameters**:
  - `productId`: 상품 ID
- **Request Body**: `ReviewCreateRequest`
- **Response**: 리뷰 정보
- **Authentication**: Required

### My Reviews (나의 리뷰 관리)

#### 14. 내 리뷰 목록 조회

- **Method**: `GET`
- **Endpoint**: `/support-service/api/v1/me/reviews`
- **Description**: 내 리뷰 목록 조회 (페이지네이션 지원)
- **Query Parameters**: `Pageable` (page, size, sort 등)
- **Response**: 페이지네이션된 리뷰 목록
- **Authentication**: Required

### Reviews (리뷰 단건 조회/수정/삭제)

#### 15. 리뷰 상세 조회

- **Method**: `GET`
- **Endpoint**: `/support-service/api/v1/reviews/{reviewId}`
- **Description**: 리뷰 상세 조회
- **Path Parameters**:
  - `reviewId`: 리뷰 ID
- **Response**: 리뷰 상세 정보

#### 16. 리뷰 수정

- **Method**: `PUT`
- **Endpoint**: `/support-service/api/v1/reviews/{reviewId}`
- **Description**: 리뷰 수정
- **Path Parameters**:
  - `reviewId`: 리뷰 ID
- **Request Body**: `ReviewUpdateRequest`
- **Response**: 수정된 리뷰 정보
- **Authentication**: Required

#### 17. 리뷰 삭제

- **Method**: `DELETE`
- **Endpoint**: `/support-service/api/v1/reviews/{reviewId}`
- **Description**: 리뷰 삭제
- **Path Parameters**:
  - `reviewId`: 리뷰 ID
- **Response**: 성공/실패 응답
- **Authentication**: Required

### Delivery (배송 관리)

#### 18. 배송 조회 (주문별)

- **Method**: `GET`
- **Endpoint**: `/support-service/api/v1/deliveries/orders/{orderId}`
- **Description**: 주문별 배송 조회
- **Path Parameters**:
  - `orderId`: 주문 ID
- **Response**: `ResponseDto<DeliveryDetailInfo>`
- **Authentication**: Required

#### 19. 배송 출고 처리

- **Method**: `PATCH`
- **Endpoint**: `/support-service/api/v1/deliveries/{id}/ship`
- **Description**: 배송 출고 처리
- **Path Parameters**:
  - `id`: 배송 ID
- **Request Body**: `ShipDeliveryRequest`
- **Response**: 배송 정보
- **Authentication**: Required

### 통합 검색

#### 20. 통합 검색

- **Method**: `GET`
- **Endpoint**: `/support-service/api/v1/search`
- **Description**: 통합 검색 기능 (상품, 농장, 체험 통합 검색)
- **Query Parameters**: 검색어 및 필터 옵션
- **Response**: `ResponseDto<UnifiedSearchResponse>`

#### 21. 통합 자동완성

- **Method**: `GET`
- **Endpoint**: `/support-service/api/v1/search/autocomplete`
- **Description**: 통합 자동완성
- **Query Parameters**: 검색어
- **Response**: `ResponseDto<UnifiedAutoCompleteResponse>`

#### 22. 상품 자동완성

- **Method**: `GET`
- **Endpoint**: `/support-service/api/v1/search/product/autocomplete`
- **Description**: 상품 자동완성
- **Query Parameters**: 검색어
- **Response**: 상품 자동완성 결과

#### 23. 농장 자동완성

- **Method**: `GET`
- **Endpoint**: `/support-service/api/v1/search/farm/autocomplete`
- **Description**: 농장 자동완성
- **Query Parameters**: 검색어
- **Response**: 농장 자동완성 결과

#### 24. 체험 자동완성

- **Method**: `GET`
- **Endpoint**: `/support-service/api/v1/search/experience/autocomplete`
- **Description**: 체험 자동완성
- **Query Parameters**: 검색어
- **Response**: 체험 자동완성 결과

### 인덱싱 (테스트용)

> **참고**: Kafka 연결 전까지 임시 사용되는 API입니다.

#### 25. 상품 인덱싱

- **Method**: `POST`
- **Endpoint**: `/support-service/api/v1/admin/search/products`
- **Description**: Elasticsearch에 상품 문서를 저장합니다. Kafka 연결 후 삭제 예정.
- **Request Body**: `ProductIndexRequest`
- **Response**: `ResponseDto<ProductDocument>`
- **Authentication**: Required (관리자 권한)

#### 26. 상품 삭제

- **Method**: `DELETE`
- **Endpoint**: `/support-service/api/v1/admin/search/products/{productId}`
- **Description**: Elasticsearch에서 상품 문서 삭제
- **Path Parameters**:
  - `productId`: 상품 ID (UUID)
- **Response**: 성공/실패 응답
- **Authentication**: Required (관리자 권한)

#### 27. 농장 인덱싱

- **Method**: `POST`
- **Endpoint**: `/support-service/api/v1/admin/search/farms`
- **Description**: Elasticsearch에 농장 문서를 저장합니다. Kafka 연결 후 삭제 예정.
- **Request Body**: `FarmIndexRequest`
- **Response**: `ResponseDto<FarmDocument>`
- **Authentication**: Required (관리자 권한)

#### 28. 농장 삭제

- **Method**: `DELETE`
- **Endpoint**: `/support-service/api/v1/admin/search/farms/{farmId}`
- **Description**: Elasticsearch에서 농장 문서 삭제
- **Path Parameters**:
  - `farmId`: 농장 ID (UUID)
- **Response**: 성공/실패 응답
- **Authentication**: Required (관리자 권한)

#### 29. 체험 인덱싱

- **Method**: `POST`
- **Endpoint**: `/support-service/api/v1/admin/search/experiences`
- **Description**: Elasticsearch에 체험 문서를 저장합니다. Kafka 연결 후 삭제 예정.
- **Request Body**: `ExperienceIndexRequest`
- **Response**: `ResponseDto<ExperienceDocument>`
- **Authentication**: Required (관리자 권한)

#### 30. 체험 삭제

- **Method**: `DELETE`
- **Endpoint**: `/support-service/api/v1/admin/search/experiences/{experienceId}`
- **Description**: Elasticsearch에서 체험 문서 삭제
- **Path Parameters**:
  - `experienceId`: 체험 ID (UUID)
- **Response**: 성공/실패 응답
- **Authentication**: Required (관리자 권한)

---

## 공통 사항

### 인증 (Authentication)

대부분의 API는 JWT 토큰 기반 인증을 사용합니다.

- **토큰 획득**: `/auth-service/api/v1/auth/login` 또는 `/auth-service/api/v1/auth/signup`을 통해 토큰 발급
- **토큰 갱신**: `/auth-service/api/v1/auth/refresh`를 통해 액세스 토큰 갱신
- **토큰 사용**: 요청 헤더에 `Authorization: Bearer {token}` 형식으로 포함

### 응답 형식

대부분의 API는 다음과 같은 공통 응답 형식을 사용합니다:

```json
{
  "success": true,
  "data": { ... },
  "message": "string",
  "timestamp": "ISO 8601"
}
```

### 에러 처리

에러 발생 시 다음과 같은 형식으로 응답됩니다:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지"
  },
  "timestamp": "ISO 8601"
}
```

### 주요 HTTP 상태 코드

- `200 OK`: 요청 성공
- `201 Created`: 리소스 생성 성공
- `400 Bad Request`: 잘못된 요청
- `401 Unauthorized`: 인증 필요
- `403 Forbidden`: 권한 없음
- `404 Not Found`: 리소스를 찾을 수 없음
- `500 Internal Server Error`: 서버 오류

---

## 업데이트 이력

- **2025-01-XX**: 스웨거 문서 기반으로 전체 API 재정리 (서비스별 경로 구조 반영)

---

## 참고 자료

- **스웨거 UI**: http://3.34.14.73:8080/swagger-ui/index.html
- **OpenAPI 문서**:
  - Auth: `/openapi/auth/v3/api-docs`
  - Buyer: `/openapi/buyer/v3/api-docs`
  - Seller: `/openapi/seller/v3/api-docs`
  - Order: `/openapi/order/v3/api-docs`
  - Support: `/openapi/support/v3/api-docs`
