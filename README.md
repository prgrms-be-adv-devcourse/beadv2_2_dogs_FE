# 🌾 바로팜 (BaroFarm) - Frontend

농장에서 식탁까지, 신선함을 바로 전하는 Farm-to-Table 플랫폼

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [시작하기](#-시작하기)
- [개발 환경 설정](#-개발-환경-설정)
- [스크립트](#-스크립트)
- [API 서비스](#-api-서비스)
- [배포](#-배포)
- [기여하기](#-기여하기)

---

## 🌱 프로젝트 소개

바로팜은 농가와 소비자를 직접 연결하는 지속가능한 농산물 직거래 플랫폼입니다.

### 주요 기능

- 🥬 **농산물 장터** - 신선한 농산물 직거래
- 🚜 **농장 체험** - 다양한 농장 체험 프로그램 예약
- 🏡 **농장 찾기** - 주변 농장 검색 및 정보 제공
- 👨‍🌾 **농가 관리** - 판매자용 대시보드 및 상품/체험 관리

---

## 🛠 기술 스택

### Core

| 기술           | 버전   | 설명                          |
| -------------- | ------ | ----------------------------- |
| **Next.js**    | 16.0.3 | React 프레임워크 (App Router) |
| **React**      | 19.2.0 | UI 라이브러리                 |
| **TypeScript** | ^5.x   | 정적 타입 언어                |

### Styling

| 기술                         | 버전     | 설명                         |
| ---------------------------- | -------- | ---------------------------- |
| **Tailwind CSS**             | ^4.1.9   | 유틸리티 기반 CSS 프레임워크 |
| **Radix UI**                 | various  | 접근성 높은 UI 컴포넌트      |
| **Lucide React**             | ^0.454.0 | 아이콘 라이브러리            |
| **class-variance-authority** | ^0.7.1   | 컴포넌트 변형 관리           |

### State Management & Forms

| 기술                | 버전    | 설명               |
| ------------------- | ------- | ------------------ |
| **Zustand**         | latest  | 상태 관리          |
| **React Hook Form** | ^7.60.0 | 폼 관리            |
| **Zod**             | 3.25.76 | 스키마 유효성 검사 |

### Development Tools

| 기술            | 버전    | 설명             |
| --------------- | ------- | ---------------- |
| **ESLint**      | ^9.39.1 | 코드 린팅        |
| **Prettier**    | ^3.7.3  | 코드 포맷팅      |
| **Husky**       | ^9.1.7  | Git Hooks        |
| **lint-staged** | ^16.2.7 | Staged 파일 린팅 |

### 기타

| 기술            | 버전   | 설명            |
| --------------- | ------ | --------------- |
| **date-fns**    | latest | 날짜 유틸리티   |
| **Recharts**    | 2.15.4 | 차트 라이브러리 |
| **Sonner**      | ^1.7.4 | 토스트 알림     |
| **next-themes** | ^0.4.6 | 다크모드 지원   |

---

## 📁 프로젝트 구조

```
beadv2_2_dogs_FE/
├── app/                      # Next.js App Router
│   ├── about/               # 소개 페이지
│   ├── admin/               # 관리자 페이지
│   ├── api/                 # API 라우트 (이벤트 로깅 등)
│   ├── booking/             # 체험 예약
│   ├── bookings/            # 예약 목록
│   ├── cart/                # 장바구니
│   ├── checkout/            # 결제 페이지
│   ├── contact/             # 문의
│   ├── deposit/             # 예치금 충전
│   ├── experiences/         # 체험 관련 페이지
│   │   └── [id]/
│   ├── farmer/              # 농가(판매자) 페이지
│   │   ├── bookings/        # 예약 관리
│   │   ├── dashboard/       # 대시보드
│   │   ├── experiences/     # 체험 관리
│   │   ├── farm/            # 농장 정보
│   │   ├── forgot-password/ # 비밀번호 찾기
│   │   ├── guide/           # 가이드
│   │   ├── login/           # 로그인
│   │   ├── orders/          # 주문 관리
│   │   ├── products/        # 상품 관리
│   │   ├── settings/        # 설정
│   │   └── signup/          # 회원가입
│   ├── farms/               # 농장 찾기
│   │   └── [id]/
│   ├── forgot-password/     # 비밀번호 찾기
│   ├── help/                # 도움말
│   ├── login/               # 로그인
│   ├── notifications/       # 알림
│   ├── oauth/               # OAuth 인증
│   │   └── kakao/
│   ├── order/               # 주문 상세
│   │   ├── [id]/
│   │   ├── fail/
│   │   └── success/
│   ├── orders/              # 주문 목록
│   ├── products/            # 상품 관련 페이지
│   │   ├── [id]/
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── profile/             # 프로필
│   │   ├── orders/
│   │   └── sections/
│   ├── reviews/             # 리뷰
│   ├── search/              # 검색
│   ├── seller/              # 판매자 페이지
│   │   ├── orders/
│   │   ├── products/
│   │   ├── reviews/
│   │   └── settlement/
│   ├── signup/              # 회원가입
│   ├── terms/               # 이용약관
│   ├── wishlist/            # 위시리스트
│   ├── globals.css          # 글로벌 스타일
│   ├── layout.tsx           # 루트 레이아웃
│   └── page.tsx             # 메인 페이지
├── components/              # 컴포넌트
│   ├── ui/                  # 공통 UI 컴포넌트 (shadcn/ui)
│   └── theme-provider.tsx   # 테마 프로바이더
├── lib/                     # 라이브러리 및 유틸리티
│   ├── api/                 # API 클라이언트 및 서비스
│   │   ├── client.ts        # Fetch 래퍼
│   │   ├── config.ts        # 서비스 URL 설정 (Gateway 기반)
│   │   ├── index.ts         # API 서비스 export
│   │   ├── services/        # 서비스별 API 함수
│   │   │   ├── address.ts
│   │   │   ├── admin.ts
│   │   │   ├── auth.ts
│   │   │   ├── cart.ts
│   │   │   ├── category.ts
│   │   │   ├── chatbot.ts
│   │   │   ├── delivery.ts
│   │   │   ├── experience.ts
│   │   │   ├── farm.ts
│   │   │   ├── notification.ts
│   │   │   ├── order.ts
│   │   │   ├── payment.ts
│   │   │   ├── product.ts
│   │   │   ├── review.ts
│   │   │   ├── search.ts
│   │   │   ├── seller.ts
│   │   │   ├── s3-upload.ts
│   │   │   └── upload.ts
│   │   └── types/           # TypeScript 타입 정의
│   ├── address-store.ts     # 주소 상태 관리
│   ├── cart-store.ts        # 장바구니 상태 관리
│   ├── security.ts          # 보안 관련 유틸리티
│   ├── upload.ts            # 파일 업로드 유틸리티
│   └── utils/               # 유틸리티 함수
│       ├── buy-now-checkout.ts
│       ├── buy-now-storage.ts
│       ├── error-handler.ts
│       ├── event-logger.ts
│       ├── image-processor.ts
│       ├── product-images.ts
│       ├── search-history.ts
│       └── search.ts
├── hooks/                   # 커스텀 훅
├── public/                  # 정적 파일
├── scripts/                 # 배포 및 유틸리티 스크립트
│   ├── deploy-frontend.sh   # 프론트엔드 배포
│   ├── rollback.sh          # 롤백 스크립트
│   ├── cleanup-images.sh    # 이미지 정리
│   ├── list-versions.sh     # 버전 목록
│   └── ...                  # 기타 스크립트
├── docs/                    # 문서
│   ├── CHATBOT_API_SPEC.md
│   ├── S3_PRESIGNED_URL_UPLOAD.md
│   └── issues/              # 이슈 문서
├── k8s/                     # Kubernetes 설정
│   └── frontend-ingress.yaml
├── styles/                  # 글로벌 스타일
│   └── globals.css
├── .husky/                  # Git Hooks
├── .github/                 # GitHub 설정
│   └── workflows/
│       └── ci-cd.yml        # CI/CD 파이프라인
├── docker-compose.yml       # Docker 배포 설정
├── Dockerfile               # Docker 이미지 빌드
├── nginx.conf               # Nginx 설정
├── nginx-docker.conf        # Docker용 Nginx 설정
├── next.config.mjs          # Next.js 설정
└── package.json
```

---

## 🚀 시작하기

### 필수 조건

- **Node.js** >= 20.x
- **pnpm** >= 9.x (권장) 또는 npm/yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/your-org/beadv2_2_dogs_FE.git
cd beadv2_2_dogs_FE

# 의존성 설치
pnpm install

# 환경 변수 설정
cp .env.example .env.local

# 개발 서버 실행
pnpm dev
```

개발 서버가 http://localhost:3000 에서 실행됩니다.

---

## ⚙️ 개발 환경 설정

### Pre-commit Hook 설정

이 프로젝트는 **Husky**와 **lint-staged**를 사용하여 커밋 전 자동으로 코드 품질을 검사합니다.

```bash
# Husky 설치 (pnpm install 시 자동 실행)
pnpm prepare

# 수동 설치가 필요한 경우
npx husky init
```

#### Pre-commit 동작 방식

커밋 시 자동으로 다음이 실행됩니다:

1. **ESLint** - `.js`, `.jsx`, `.ts`, `.tsx` 파일 린트 및 자동 수정
2. **Prettier** - 코드 포맷팅

#### 설정 파일

| 파일                 | 설명                      |
| -------------------- | ------------------------- |
| `.husky/pre-commit`  | Git pre-commit hook       |
| `.lintstagedrc.json` | lint-staged 설정          |
| `eslint.config.mjs`  | ESLint 설정 (Flat Config) |
| `.prettierrc`        | Prettier 설정             |

### IDE 설정 (VS Code 권장)

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

권장 확장 프로그램:

- ESLint
- Prettier
- Tailwind CSS IntelliSense

---

## 📜 스크립트

```bash
# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# ESLint 검사
pnpm lint

# ESLint 자동 수정
pnpm lint:fix

# Prettier 포맷팅
pnpm format

# Prettier 검사만
pnpm format:check
```

---

## 🔌 API 서비스

### 백엔드 서비스 구조

프론트엔드는 **API Gateway**를 통해 모든 백엔드 서비스에 접근합니다.

#### API Gateway

| 항목            | 값                                  | 설명                   |
| --------------- | ----------------------------------- | ---------------------- |
| **Gateway URL** | `http://3.34.14.73:8080` (프로덕션) | 모든 API 요청의 진입점 |
| **포트**        | 8080                                | Gateway 서비스 포트    |

#### 백엔드 마이크로서비스

모든 서비스는 Gateway를 통해 라우팅되며, 각 서비스는 다음과 같은 prefix로 접근합니다:

| 서비스 Prefix         | 포함 도메인                                         | 설명          |
| --------------------- | --------------------------------------------------- | ------------- |
| `/auth-service`       | auth                                                | 인증 서비스   |
| `/buyer-service`      | buyer, cart, product, inventory                     | 구매자 서비스 |
| `/seller-service`     | seller, farm                                        | 판매자 서비스 |
| `/order-service`      | order                                               | 주문 서비스   |
| `/payment-service`    | payment                                             | 결제 서비스   |
| `/support-service`    | delivery, notification, experience, review, deposit | 지원 서비스   |
| `/settlement-service` | settlement                                          | 정산 서비스   |
| `/ai-service`         | search, recommend, review, season                   | AI 서비스     |

#### 실제 서비스 포트 (내부)

| 모듈            | 포트 | 설명                                                |
| --------------- | ---- | --------------------------------------------------- |
| eureka          | 8761 | Service Registry                                    |
| config          | 8888 | Config Server                                       |
| gateway         | 8080 | API Gateway                                         |
| baro-auth       | 8081 | auth                                                |
| baro-buyer      | 8082 | buyer, cart, product                                |
| baro-seller     | 8085 | seller, farm                                        |
| baro-order      | 8087 | order                                               |
| baro-payment    | 8088 | payment                                             |
| baro-support    | 8089 | delivery, notification, experience, review, deposit |
| baro-settlement | 8090 | settlement (DaemonSet 배포)                         |
| baro-ai         | 8092 | search, recommend, review, season                   |

> **참고**: 프론트엔드는 직접 마이크로서비스에 접근하지 않으며, Gateway를 통해서만 API를 호출합니다.

### API 사용 예시

모든 API 호출은 Gateway를 통해 자동으로 라우팅됩니다.

```typescript
import { authService, productService, cartService } from '@/lib/api'

// 로그인 (Gateway → /auth-service/api/auth/login)
const { accessToken, user } = await authService.login({
  email: 'user@example.com',
  password: 'password123',
})

// 상품 목록 조회 (Gateway → /buyer-service/api/products)
const products = await productService.getProducts({
  page: 0,
  size: 20,
  category: '채소',
})

// 장바구니에 추가 (Gateway → /buyer-service/api/cart)
await cartService.addToCart({
  productId: 1,
  quantity: 2,
})
```

**API 호출 흐름:**

1. 프론트엔드 → API Gateway (`http://3.34.14.73:8080`)
2. Gateway → 해당 마이크로서비스 (예: `/buyer-service/api/products`)
3. 마이크로서비스 → 응답 반환
4. Gateway → 프론트엔드

### 환경 변수

```env
# .env.local
# API Gateway URL (모든 서비스의 진입점)
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8080
# 또는 프로덕션 환경
# NEXT_PUBLIC_API_GATEWAY_URL=http://3.34.14.73:8080

# API Base URL (Gateway URL과 동일하게 설정)
NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_GATEWAY_URL}

# Gateway URL (별칭, API_GATEWAY_URL과 동일)
NEXT_PUBLIC_GATEWAY_URL=${NEXT_PUBLIC_API_GATEWAY_URL}

# 토스페이먼츠 클라이언트 키
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_ma60RZblrqReBBKpoZ7E8wzYWBn1

# 이미지 베이스 URL (Nginx를 통해 서빙)
NEXT_PUBLIC_IMAGE_BASE_URL=/uploads

# 카카오 OAuth
NEXT_PUBLIC_KAKAO_CLIENT_ID=your_kakao_client_id
NEXT_PUBLIC_KAKAO_REDIRECT_URI=http://localhost:3000/oauth/kakao/callback

# API Rewrites 사용 여부 (Nginx 사용 시 false)
NEXT_PUBLIC_USE_API_REWRITES=false
```

> **참고**: 모든 API 요청은 `NEXT_PUBLIC_API_GATEWAY_URL`을 통해 Gateway로 전달되며, Gateway가 각 마이크로서비스로 라우팅합니다.

---

## 🐳 배포

### CI/CD 파이프라인 (자동 배포)

이 프로젝트는 **GitHub Actions**를 사용하여 자동으로 빌드, 테스트, Docker 이미지 생성 및 EC2 배포를 수행합니다.

#### 브랜치 전략

- `main-*` 브랜치에 push 시 자동 배포 실행
- Pull Request 시 빌드 및 테스트만 실행
- 예: `main-frontend` 브랜치에 push하면 자동 배포

#### CI/CD 단계

1. **Build & Test** - 의존성 설치, 린트 검사, 빌드
2. **Docker Build** - GitHub Container Registry에 이미지 푸시
3. **Deploy** - EC2에 자동 배포
4. **Cleanup** - 오래된 이미지 정리

#### 필요한 GitHub Secrets

GitHub 저장소의 **Settings → Secrets and variables → Actions**에서 다음 Secrets를 설정하세요:

| Secret         | 설명                                   | 예시                                 |
| -------------- | -------------------------------------- | ------------------------------------ |
| `EC2_SSH_KEY`  | EC2 접속용 SSH private key (전체 내용) | `-----BEGIN RSA PRIVATE KEY-----...` |
| `EC2_HOST`     | EC2 인스턴스 IP 주소 또는 도메인       | `123.45.67.89`                       |
| `EC2_USERNAME` | EC2 SSH 사용자명                       | `ec2-user` 또는 `ubuntu`             |

#### 배포 경로

EC2의 `/home/{EC2_USERNAME}/apps/FE` 디렉토리에 배포됩니다.

### 수동 배포

#### 로컬에서 Docker 빌드 및 실행

```bash
# Docker 이미지 빌드 및 실행
docker-compose up -d --build

# 로그 확인
docker-compose logs -f

# 중지
docker-compose down
```

#### EC2 수동 배포

1. **EC2 인스턴스에 Docker 설치**

```bash
# Amazon Linux 2023
sudo yum update -y
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER

# Docker Compose 설치
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

2. **프로젝트 배포**

```bash
# 프로젝트 디렉토리로 이동
cd ~/apps/FE

# 환경 변수 설정 (docker-compose.yml 내 environment 수정)
# 또는 .env 파일 생성

# 배포 스크립트 실행
bash deploy-frontend.sh
```

### 배포 스크립트

프로젝트에는 배포 및 관리를 위한 유틸리티 스크립트가 포함되어 있습니다.

#### `scripts/deploy-frontend.sh`

EC2에 프론트엔드를 배포하는 메인 스크립트입니다.

```bash
# CI/CD에서 자동 실행되며, 수동 실행도 가능
bash scripts/deploy-frontend.sh
```

**기능:**

- GitHub Container Registry에서 최신 이미지 Pull
- 기존 컨테이너 중지 및 새 컨테이너 시작
- 헬스 체크 및 배포 이력 기록

#### `scripts/list-versions.sh`

배포된 버전 목록을 확인합니다.

```bash
# 로컬 이미지 및 배포 이력 확인
bash scripts/list-versions.sh
```

**기능:**

- 로컬 Docker 이미지 목록
- 배포 이력 확인
- 현재 실행 중인 버전 확인

#### `scripts/rollback.sh`

이전 버전으로 안전하게 롤백합니다.

```bash
# 특정 태그로 롤백
bash scripts/rollback.sh main-frontend-abc123

# latest 태그로 롤백
bash scripts/rollback.sh latest
```

**기능:**

- 타겟 이미지 Pull
- 기존 컨테이너 백업
- 새 버전으로 시작 및 헬스 체크
- 실패 시 자동 복원

#### `scripts/cleanup-images.sh`

오래된 Docker 이미지를 정리합니다.

```bash
# 최근 5개 버전만 유지 (기본값)
bash scripts/cleanup-images.sh 5

# 최근 10개 버전 유지
bash scripts/cleanup-images.sh 10
```

**기능:**

- 최근 N개 버전만 유지
- 사용 중인 이미지는 건너뛰기
- 미사용 및 dangling 이미지 정리

#### `scripts/install-hooks.sh`

Git hooks를 설치합니다.

```bash
# pre-commit hook 설치
bash scripts/install-hooks.sh
```

### 네트워크 구성

각 백엔드 서비스가 별도의 docker-compose로 실행되는 경우:

```yaml
# docker-compose.yml
services:
  frontend:
    network_mode: host # localhost로 다른 서비스 접근 가능
    environment:
      - NEXT_PUBLIC_AUTH_SERVICE_URL=http://localhost:8081
      - NEXT_PUBLIC_BUYER_SERVICE_URL=http://localhost:8082
      # ...
```

### 배포 이력

배포 및 롤백 이력은 `~/apps/FE/deployment-history.log`에 자동으로 기록됩니다.

```bash
# 배포 이력 확인
cat ~/apps/FE/deployment-history.log
```

### Vercel 배포 (선택사항)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel --prod
```

---

## 🤝 기여하기

### 브랜치 전략

- `main` - 프로덕션 브랜치
- `develop` - 개발 브랜치
- `feature/*` - 기능 개발
- `hotfix/*` - 긴급 수정

### 커밋 컨벤션

<!-- ```
<type>(<scope>): <subject>

# 예시
feat(product): 상품 필터링 기능 추가
fix(cart): 수량 업데이트 버그 수정
docs(readme): 배포 가이드 추가
``` -->

| Type     | 설명        |
| -------- | ----------- |
| feat     | 새로운 기능 |
| fix      | 버그 수정   |
| docs     | 문서 변경   |
| style    | 코드 포맷팅 |
| refactor | 리팩토링    |
| test     | 테스트 추가 |
| chore    | 기타 변경   |

### Pull Request

1. Fork 후 feature 브랜치 생성
2. 변경사항 커밋 (Pre-commit hook 자동 실행)
3. develop 브랜치로 PR 생성
4. 코드 리뷰 후 머지

---

## 📄 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다.

---
