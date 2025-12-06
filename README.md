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

| 기술 | 버전 | 설명 |
|------|------|------|
| **Next.js** | 16.0.3 | React 프레임워크 (App Router) |
| **React** | 19.2.0 | UI 라이브러리 |
| **TypeScript** | ^5.x | 정적 타입 언어 |

### Styling

| 기술 | 버전 | 설명 |
|------|------|------|
| **Tailwind CSS** | ^4.1.9 | 유틸리티 기반 CSS 프레임워크 |
| **Radix UI** | various | 접근성 높은 UI 컴포넌트 |
| **Lucide React** | ^0.454.0 | 아이콘 라이브러리 |
| **class-variance-authority** | ^0.7.1 | 컴포넌트 변형 관리 |

### State Management & Forms

| 기술 | 버전 | 설명 |
|------|------|------|
| **Zustand** | latest | 상태 관리 |
| **React Hook Form** | ^7.60.0 | 폼 관리 |
| **Zod** | 3.25.76 | 스키마 유효성 검사 |

### Development Tools

| 기술 | 버전 | 설명 |
|------|------|------|
| **ESLint** | ^9.39.1 | 코드 린팅 |
| **Prettier** | ^3.7.3 | 코드 포맷팅 |
| **Husky** | ^9.1.7 | Git Hooks |
| **lint-staged** | ^16.2.7 | Staged 파일 린팅 |

### 기타

| 기술 | 버전 | 설명 |
|------|------|------|
| **date-fns** | latest | 날짜 유틸리티 |
| **Recharts** | 2.15.4 | 차트 라이브러리 |
| **Sonner** | ^1.7.4 | 토스트 알림 |
| **next-themes** | ^0.4.6 | 다크모드 지원 |

---

## 📁 프로젝트 구조

```
beadv2_2_dogs_FE/
├── app/                      # Next.js App Router
│   ├── (auth)/              # 인증 관련 페이지
│   │   ├── login/
│   │   └── signup/
│   ├── products/            # 상품 관련 페이지
│   │   ├── [id]/
│   │   └── page.tsx
│   ├── experiences/         # 체험 관련 페이지
│   ├── farmer/              # 농가(판매자) 페이지
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── login/
│   │   └── signup/
│   ├── cart/                # 장바구니
│   ├── checkout/            # 결제
│   ├── order/               # 주문
│   ├── layout.tsx           # 루트 레이아웃
│   └── page.tsx             # 메인 페이지
├── components/
│   ├── ui/                  # 공통 UI 컴포넌트 (shadcn/ui)
│   └── theme-provider.tsx   # 테마 프로바이더
├── lib/
│   ├── api/                 # API 클라이언트 및 서비스
│   │   ├── client.ts        # Fetch 래퍼
│   │   ├── config.ts        # 서비스 URL 설정
│   │   ├── types.ts         # TypeScript 타입
│   │   └── services/        # 서비스별 API 함수
│   ├── cart-store.ts        # 장바구니 상태 관리
│   └── utils.ts             # 유틸리티 함수
├── hooks/                   # 커스텀 훅
├── public/                  # 정적 파일
├── styles/                  # 글로벌 스타일
├── .husky/                  # Git Hooks
├── docker-compose.yml       # Docker 배포 설정
├── Dockerfile               # Docker 이미지 빌드
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

| 파일 | 설명 |
|------|------|
| `.husky/pre-commit` | Git pre-commit hook |
| `.lintstagedrc.json` | lint-staged 설정 |
| `eslint.config.mjs` | ESLint 설정 (Flat Config) |
| `.prettierrc` | Prettier 설정 |

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

### 백엔드 서비스 포트

| 모듈  | 포트 | 포함 도메인 |
|-------|------|-------------|
| eureka      | 8761 | Service Registry |
| config      | 8888 | Config Server |
| gateway     | 8080 | API Gateway |
| baro-auth   | 8081 | auth |
| baro-buyer  | 8082 | buyer, cart, product |
| baro-seller | 8085 | seller, farm |
| baro-order  | 8087 | order, payment |
| baro-support| 8089 | settlement, delivery, notification, experience, search, review |

### API 사용 예시

```typescript
import { authService, productService, cartService } from '@/lib/api'

// 로그인
const { accessToken, user } = await authService.login({
  email: 'user@example.com',
  password: 'password123'
})

// 상품 목록 조회
const products = await productService.getProducts({
  page: 0,
  size: 20,
  category: '채소'
})

// 장바구니에 추가
await cartService.addToCart({
  productId: 1,
  quantity: 2
})
```

### 환경 변수

```env
# .env.local
NEXT_PUBLIC_AUTH_SERVICE_URL=http://localhost:8081
NEXT_PUBLIC_PRODUCT_SERVICE_URL=http://localhost:8084
NEXT_PUBLIC_CART_SERVICE_URL=http://localhost:8083
# ... 기타 서비스 URL
```

---

## 🐳 배포

### Docker 배포 (권장)

#### 로컬에서 Docker 빌드 및 실행

```bash
# Docker 이미지 빌드 및 실행
docker-compose up -d --build

# 로그 확인
docker-compose logs -f

# 중지
docker-compose down
```

#### EC2 배포

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
# 프로젝트 클론
git clone https://github.com/your-org/beadv2_2_dogs_FE.git
cd beadv2_2_dogs_FE

# 환경 변수 설정 (docker-compose.yml 내 environment 수정)
# 또는 .env 파일 생성

# 빌드 및 실행
docker-compose up -d --build
```

#### 네트워크 구성

각 백엔드 서비스가 별도의 docker-compose로 실행되는 경우:

```yaml
# docker-compose.yml
services:
  frontend:
    network_mode: host  # localhost로 다른 서비스 접근 가능
    environment:
      - NEXT_PUBLIC_AUTH_SERVICE_URL=http://localhost:8081
      # ...
```

### Vercel 배포

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

| Type | 설명 |
|------|------|
| feat | 새로운 기능 |
| fix | 버그 수정 |
| docs | 문서 변경 |
| style | 코드 포맷팅 |
| refactor | 리팩토링 |
| test | 테스트 추가 |
| chore | 기타 변경 |

### Pull Request

1. Fork 후 feature 브랜치 생성
2. 변경사항 커밋 (Pre-commit hook 자동 실행)
3. develop 브랜치로 PR 생성
4. 코드 리뷰 후 머지

---

## 📄 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다.

---


