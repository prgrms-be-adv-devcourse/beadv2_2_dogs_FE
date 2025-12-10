# 최종 배포 가이드 - S3 마운트 없음 (Nginx 서빙)

## 🎯 최종 결정사항

**프론트엔드는 S3 마운트 없이 운영**

- ✅ 보안: 프론트엔드는 S3 접근 불필요
- ✅ 성능: Nginx가 직접 이미지 서빙
- ✅ 단순함: 프론트엔드 컨테이너 가벼움

## 📐 아키텍처

```
[이미지 업로드]
사용자 → 프론트엔드 → 백엔드 API (8085) → S3 (/mnt/mybucket)
                      └─ uploadService 사용

[이미지 서빙]
사용자 → Nginx → /mnt/mybucket/uploads/ (호스트에서 직접 접근)
```

## 🚀 배포 순서

### 1. S3 마운트 확인 (호스트)

```bash
# 마운트 상태 확인
df -h | grep mybucket

# 출력 예시:
# your-bucket-name  /mnt/mybucket  fuse.s3fs  ...

# 업로드 디렉토리 생성 (없으면)
sudo mkdir -p /mnt/mybucket/uploads
sudo chmod 755 /mnt/mybucket/uploads
```

### 2. Nginx 설정

```bash
# nginx.conf를 /etc/nginx/sites-available/로 복사
sudo cp nginx.conf /etc/nginx/sites-available/barofarm-frontend

# 심볼릭 링크 생성
sudo ln -s /etc/nginx/sites-available/barofarm-frontend /etc/nginx/sites-enabled/

# 기존 default 설정 제거 (필요시)
sudo rm /etc/nginx/sites-enabled/default

# Nginx 설정 테스트
sudo nginx -t

# Nginx 재시작
sudo systemctl restart nginx
sudo systemctl status nginx
```

### 3. 프론트엔드 배포

```bash
cd ~/apps/FE

# 최신 코드 pull (또는 새로 clone)
git pull origin main

# Docker 빌드 및 실행
docker-compose down
docker-compose up -d --build

# 컨테이너 상태 확인
docker-compose ps
docker-compose logs -f frontend
```

### 4. 백엔드 설정 (필수)

백엔드에서 파일 업로드 API 구현 필요:

**엔드포인트:**

```
POST /api/files/upload
Authorization: Bearer {token}
```

**백엔드 docker-compose.yml:**

```yaml
services:
  backend:
    volumes:
      # 백엔드는 S3 쓰기 권한 필요
      - /mnt/mybucket:/mnt/mybucket:rw

    environment:
      - UPLOAD_DIR=/mnt/mybucket/uploads
```

### 5. 테스트

```bash
# 1. 프론트엔드 접속 확인
curl http://localhost:3000

# 2. Nginx 이미지 서빙 테스트
# 테스트 이미지 생성
echo "test" | sudo tee /mnt/mybucket/uploads/test.txt

# 브라우저에서 확인
# http://your-domain.com/uploads/test.txt

# 3. 업로드 테스트 (백엔드 준비 후)
# 프론트엔드에서 체험 관리 → 이미지 업로드
```

## 📋 환경 변수 확인

### 프론트엔드 (.env.local)

```bash
# 필요 없음:
# UPLOAD_DIR (프론트엔드는 업로드 안 함)

# 필요:
NEXT_PUBLIC_IMAGE_BASE_URL=/uploads
NEXT_PUBLIC_SELLER_SERVICE_URL=http://localhost:8085
```

### 백엔드 (.env)

```bash
UPLOAD_DIR=/mnt/mybucket/uploads
AWS_S3_BUCKET=your-bucket-name
```

## 🔧 Nginx 설정 내용

```nginx
# /etc/nginx/sites-available/barofarm-frontend

upstream nextjs_frontend {
    server localhost:3000;
}

server {
    listen 80;
    server_name your-domain.com;

    client_max_body_size 10M;

    # 이미지 서빙 (S3 마운트에서 직접)
    location /uploads/ {
        alias /mnt/mybucket/uploads/;

        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Access-Control-Allow-Origin *;

        location ~ \.(jpg|jpeg|png|gif|webp|svg)$ {
            try_files $uri =404;
        }
    }

    # Next.js 프록시
    location / {
        proxy_pass http://nextjs_frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # API Routes (업로드 포함)
    location /api/ {
        proxy_pass http://nextjs_frontend;
        proxy_set_header Host $host;

        # 업로드를 위한 긴 타임아웃
        proxy_connect_timeout 300s;
        proxy_send_timeout 300s;
        proxy_read_timeout 300s;
    }
}
```

## 💻 프론트엔드 코드 사용법

### 체험 이미지 업로드

```typescript
import { uploadService } from '@/lib/api/services'
import { useToast } from '@/hooks/use-toast'

const { toast } = useToast()

const handleImageUpload = async (file: File) => {
  try {
    // 백엔드 API로 업로드
    const result = await uploadService.uploadExperienceImage(file)

    // result.url: "/uploads/2024/12/07/1234567890-abc123.jpg"
    // Nginx가 이 경로를 /mnt/mybucket/uploads/...로 서빙

    console.log('업로드 성공:', result.url)

    toast({
      title: '업로드 성공',
      description: '이미지가 업로드되었습니다.',
    })

    return result.url
  } catch (error) {
    toast({
      title: '업로드 실패',
      description: error instanceof Error ? error.message : '오류 발생',
      variant: 'destructive',
    })
  }
}
```

### 농장 이미지 업로드

```typescript
const handleFarmImageUpload = async (file: File) => {
  const result = await uploadService.uploadFarmImage(file)
  return result.url
}
```

### 상품 이미지 여러 개 업로드

```typescript
const handleProductImagesUpload = async (files: File[]) => {
  const result = await uploadService.uploadProductImages(files)
  return result.files.map((f) => f.url)
}
```

## ✅ 배포 후 체크리스트

- [ ] S3 버킷이 호스트에 마운트됨 (`/mnt/mybucket`)
- [ ] Nginx 설정 완료 및 재시작
- [ ] 프론트엔드 컨테이너 실행 중
- [ ] 백엔드 파일 업로드 API 구현 완료
- [ ] 백엔드 컨테이너가 S3 마운트됨 (rw)
- [ ] 테스트 이미지 업로드 확인
- [ ] 브라우저에서 `/uploads/` 경로로 이미지 확인

## 🔍 트러블슈팅

### 이미지가 표시되지 않을 때

```bash
# 1. Nginx 설정 확인
sudo nginx -t
sudo systemctl status nginx

# 2. S3 마운트 확인
ls -la /mnt/mybucket/uploads/

# 3. 권한 확인
sudo chmod 755 /mnt/mybucket/uploads
sudo chmod 644 /mnt/mybucket/uploads/*.jpg

# 4. Nginx 로그 확인
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### 업로드가 실패할 때

```bash
# 1. 백엔드 로그 확인
docker logs backend-container-name

# 2. 백엔드 S3 마운트 확인
docker exec backend-container-name ls -la /mnt/mybucket/uploads

# 3. 백엔드 쓰기 권한 테스트
docker exec backend-container-name touch /mnt/mybucket/uploads/test.txt
```

### 프론트엔드 컨테이너 확인

```bash
# 로그 확인
docker logs barofarm-frontend

# 환경 변수 확인
docker exec barofarm-frontend env | grep NEXT_PUBLIC

# 컨테이너 내부 확인
docker exec -it barofarm-frontend /bin/sh
```

## 📊 현재 vs 최종

| 항목                 | 임시 (백엔드 준비 전) | 최종 (현재) |
| -------------------- | --------------------- | ----------- |
| **프론트 S3 마운트** | ✅ rw                 | ❌ 없음     |
| **업로드 처리**      | Next.js API           | 백엔드 API  |
| **이미지 서빙**      | Next.js               | Nginx       |
| **보안**             | ⚠️ 취약               | ✅ 안전     |
| **성능**             | ⚠️ 보통               | ✅ 최고     |

## 🎯 다음 단계

1. **백엔드 파일 업로드 API 완성 대기**
   - 백엔드 팀에 API 명세 전달
   - 테스트 환경에서 검증

2. **백엔드 API 완성 후**
   - 프론트엔드 코드는 이미 준비됨 (`uploadService`)
   - 바로 사용 가능

3. **모니터링**
   - Nginx 로그 확인
   - S3 용량 모니터링
   - 이미지 업로드/서빙 성능 측정

## 📚 참고 문서

- `nginx.conf` - Nginx 설정 파일
- `UPLOAD_GUIDE.md` - 업로드 사용 가이드
- `S3_ARCHITECTURE.md` - 아키텍처 비교
- `S3_SETUP.md` - S3 마운트 설정
- `docker-compose.yml` - 프론트엔드 설정

---

**배포 완료 후 확인:**

```bash
✅ http://your-domain.com → 프론트엔드 정상
✅ http://your-domain.com/uploads/test.jpg → 이미지 서빙 정상
✅ 체험 관리 페이지에서 이미지 업로드 → 업로드 정상
```
