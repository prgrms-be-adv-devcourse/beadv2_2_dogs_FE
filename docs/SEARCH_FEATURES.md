# 검색 기능 확장 가이드

검색 기능에 API 연동을 위한 확장 가능한 구조가 준비되어 있습니다.

## 📦 준비된 기능들

### 1. 검색 유틸리티 (`lib/utils/search.ts`)

- ✅ **디바운싱**: API 호출 최적화를 위한 디바운스 함수
- ✅ **검색어 하이라이트**: 검색 결과에서 키워드 강조
- ✅ **검색어 정규화**: 공백 제거, 소문자 변환
- ✅ **검색어 유효성 검사**: 최소 길이 검증

### 2. 검색 훅 (`hooks/use-search.ts`)

- ✅ **자동완성**: `getSuggestions` API 연동 준비
- ✅ **인기 검색어**: `getPopularKeywords` API 연동 준비
- ✅ **로딩/에러 상태**: API 호출 상태 관리
- ✅ **디바운싱**: 자동완성 API 호출 최적화
- ✅ **요청 취소**: 이전 요청 자동 취소 (AbortController)

### 3. 검색 히스토리 (`lib/utils/search-history.ts`)

- ✅ **로컬 스토리지 저장**: 최근 검색어 저장
- ✅ **중복 제거**: 같은 검색어는 최신으로 업데이트
- ✅ **최대 개수 제한**: 최대 10개까지 저장
- ✅ **타입별 저장**: 상품/체험/농장 구분 저장

### 4. 검색 컴포넌트

#### `SearchInput`

- 검색 입력 필드
- 클리어 버튼
- 포커스 관리

#### `SearchSuggestions`

- 자동완성 추천 검색어
- 최근 검색어
- 인기 검색어
- 개별/전체 삭제 기능

#### `SearchBox`

- 통합 검색 박스 컴포넌트
- 모든 기능 통합
- 외부 클릭 감지
- 키보드 이벤트 처리 (Enter, Escape)

#### `HighlightText`

- 검색어 하이라이트 표시

## 🚀 사용 방법

### 기본 사용 (현재 방식 - 클라이언트 필터링)

```tsx
import { SearchInput } from '@/components/search'

function ProductsPage() {
  const [query, setQuery] = useState('')

  return <SearchInput value={query} onChange={setQuery} placeholder="상품 검색..." />
}
```

### 고급 사용 (API 연동 준비)

```tsx
import { SearchBox } from '@/components/search'

function ProductsPage() {
  const handleSearch = (query: string) => {
    // API 호출 또는 필터링 로직
    console.log('검색:', query)
  }

  return (
    <SearchBox
      placeholder="상품 검색..."
      onSearch={handleSearch}
      searchType="product"
      enableSuggestions={true}
      enablePopularKeywords={true}
      debounceDelay={300}
    />
  )
}
```

### 커스텀 훅 사용

```tsx
import { useSearch } from '@/hooks/use-search'

function CustomSearchComponent() {
  const { query, suggestions, popularKeywords, isLoading, handleQueryChange, selectSuggestion } =
    useSearch({
      minLength: 2,
      debounceDelay: 300,
      enableSuggestions: true,
      enablePopularKeywords: true,
    })

  return (
    <div>
      <input value={query} onChange={(e) => handleQueryChange(e.target.value)} />
      {suggestions.map((suggestion) => (
        <button key={suggestion} onClick={() => selectSuggestion(suggestion)}>
          {suggestion}
        </button>
      ))}
    </div>
  )
}
```

## 🔌 API 연동 방법

### 1. 자동완성 API 연동

`lib/api/services/search.ts`의 `getSuggestions` 함수가 이미 준비되어 있습니다:

```typescript
// lib/api/services/search.ts
async getSuggestions(keyword: string): Promise<string[]> {
  return searchApi.get<string[]>('/api/search/suggestions', {
    params: { keyword }
  })
}
```

`useSearch` 훅이 자동으로 이 API를 호출합니다.

### 2. 인기 검색어 API 연동

```typescript
// lib/api/services/search.ts
async getPopularKeywords(): Promise<string[]> {
  return searchApi.get<string[]>('/api/search/popular-keywords')
}
```

### 3. 검색 결과 API 연동

```typescript
import { searchService } from '@/lib/api/services/search'

// 상품 검색
const products = await searchService.searchProducts(keyword)

// 체험 검색
const experiences = await searchService.searchExperiences(keyword)

// 농장 검색
const farms = await searchService.searchFarms(keyword)

// 통합 검색
const results = await searchService.search({
  keyword,
  type: 'ALL',
  page: 1,
  size: 20,
})
```

## 📝 마이그레이션 가이드

### 기존 코드를 SearchBox로 변경

**Before:**

```tsx
<Input placeholder="검색..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
```

**After:**

```tsx
<SearchBox
  placeholder="검색..."
  onSearch={(query) => {
    // 검색 로직
    setSearchQuery(query)
  }}
  searchType="product"
/>
```

## 🎨 커스터마이징

### 디바운스 시간 조정

```tsx
<SearchBox debounceDelay={500} /> // 500ms로 변경
```

### 최소 검색어 길이

```tsx
const { hasQuery } = useSearch({ minLength: 2 })
```

### 검색어 하이라이트

```tsx
import { HighlightText } from '@/components/search'
;<HighlightText text="유기농 방울토마토" keyword="토마토" />
```

## 🔮 향후 확장 가능한 기능

1. **검색 분석**: 검색어 통계 수집
2. **검색 필터**: 가격 범위, 지역 등
3. **검색 결과 정렬**: 관련도, 인기순 등
4. **검색 결과 페이지네이션**: 무한 스크롤 또는 페이지네이션
5. **검색어 자동완성 개선**: 카테고리별 추천
6. **음성 검색**: 음성 인식 API 연동
7. **이미지 검색**: 이미지로 상품 검색

## 📚 관련 파일

- `lib/utils/search.ts` - 검색 유틸리티
- `lib/utils/search-history.ts` - 검색 히스토리 관리
- `hooks/use-search.ts` - 검색 커스텀 훅
- `components/search/` - 검색 컴포넌트들
- `lib/api/services/search.ts` - 검색 API 서비스
