# API 연동 상태 확인

## ✅ API 연동 완료된 페이지

### 1. 인증 관련

- ✅ **app/login/page.tsx** - `authService.login()` 사용
- ✅ **app/signup/page.tsx** - `authService.signup()` 사용
- ✅ **app/farmer/signup/page.tsx** - `authService` 사용
- ✅ **components/layout/header.tsx** - `authService.getCurrentUser()` 사용

### 2. 상품 관련

- ✅ **app/products/[id]/page.tsx** - `productService.getProduct()` 사용
- ❌ **app/products/page.tsx** - **더미 데이터 사용 중** (API 연동 필요)

### 3. 장바구니 관련

- ⚠️ **app/cart/page.tsx** - `cartService` import만 있고 실제 사용 안 함 (TODO 주석)
  - 현재는 `useCartStore`만 사용 (로컬 상태)
  - 서버 장바구니 동기화 필요

### 4. 주문/결제 관련

- ✅ **app/checkout/page.tsx** - `orderService.createOrder()`, `depositService.getDeposit()` 사용
- ✅ **app/order/success/page.tsx** - `paymentService.confirmPayment()` 사용
- ❌ **app/order/[id]/page.tsx** - **더미 데이터 사용 중** (API 연동 필요)
- ✅ **app/order/fail/page.tsx** - 정적 페이지 (API 불필요)

### 5. 프로필 관련

- ✅ **app/profile/page.tsx** - `authService.getCurrentUser()`, `depositService.getDeposit()` 사용

### 6. 체험 프로그램 관련

- ✅ **app/experiences/page.tsx** - `experienceService.getExperiences()` 사용
- ❌ **app/experiences/[id]/page.tsx** - 확인 필요

### 7. 리뷰 관련

- ✅ **components/review/review-form.tsx** - `reviewService.createProductReview()`, `uploadService.uploadFile()` 사용

### 8. 검색 관련

- ✅ **hooks/use-search.ts** - `searchService.getAutocomplete()` 사용

---

## ❌ API 연동 필요한 페이지

### 1. 상품 목록 페이지

**파일**: `app/products/page.tsx`

- **현재 상태**: 더미 데이터 하드코딩
- **필요 작업**: `productService.getProducts()` 연동
- **우선순위**: 높음

### 2. 장바구니 페이지

**파일**: `app/cart/page.tsx`

- **현재 상태**: `cartService` import만 있고 실제 사용 안 함
- **필요 작업**:
  - `cartService.getCart()`로 서버 장바구니 조회
  - 로컬 장바구니와 서버 장바구니 동기화
  - `cartService.updateCartItem()`, `cartService.removeCartItem()` 사용
- **우선순위**: 높음

### 3. 주문 상세 페이지

**파일**: `app/order/[id]/page.tsx`

- **현재 상태**: 더미 데이터 하드코딩
- **필요 작업**: `orderService.getOrder()` 연동
- **우선순위**: 중간

### 4. 체험 프로그램 상세 페이지

**파일**: `app/experiences/[id]/page.tsx`

- **현재 상태**: 확인 필요
- **필요 작업**: `experienceService.getExperience()` 연동
- **우선순위**: 중간

### 5. 농장 관련 페이지

**파일**: `app/farms/page.tsx`, `app/farms/[id]/page.tsx`

- **현재 상태**: 확인 필요
- **필요 작업**: `farmService` 연동
- **우선순위**: 낮음

### 6. 알림 페이지

**파일**: `app/notifications/page.tsx`

- **현재 상태**: 확인 필요
- **필요 작업**: `notificationService` 연동 (API 엔드포인트 확인 필요)
- **우선순위**: 낮음

### 7. 판매자 대시보드

**파일**: `app/farmer/*` 페이지들

- **현재 상태**: 확인 필요
- **필요 작업**: 각 페이지별 API 연동
- **우선순위**: 중간

---

## 🔧 개선 사항

### 1. 장바구니 동기화

- 현재 로컬 상태(`useCartStore`)만 사용
- 서버 장바구니와 동기화 로직 필요
- 로그인 시 서버 장바구니 불러오기
- 장바구니 변경 시 서버에 반영

### 2. 상품 목록 페이지

- 더미 데이터 제거
- `productService.getProducts()` 연동
- 페이지네이션, 필터링, 정렬 기능 추가

### 3. 에러 처리 개선

- API 에러 시 사용자 친화적 메시지 표시
- 네트워크 에러 처리
- 404, 401 등 상태 코드별 처리

### 4. 로딩 상태 개선

- API 호출 중 로딩 스피너 표시
- 스켈레톤 UI 적용

---

## 📊 연동 완료율

- ✅ **완료**: 10개 페이지/컴포넌트
- ⚠️ **부분 완료**: 1개 (장바구니)
- ❌ **미완료**: 6개 이상

**예상 완료율**: 약 60%

---

## 다음 단계

1. **상품 목록 페이지 API 연동** (우선순위 높음)
2. **장바구니 서버 동기화** (우선순위 높음)
3. **주문 상세 페이지 API 연동** (우선순위 중간)
4. **체험 프로그램 상세 페이지 API 연동** (우선순위 중간)
5. **기타 페이지들 점진적 연동**
