'use client'

import { useState, useRef, useEffect } from 'react'
import { SearchInput } from './search-input'
import { SearchSuggestions } from './search-suggestions'
import { useSearch } from '@/hooks/use-search'
import { addSearchHistory } from '@/lib/utils/search-history'
import { cn } from '@/lib/utils'

interface SearchBoxProps {
  /** 초기 검색어 */
  initialQuery?: string
  /** 검색어 변경 핸들러 */
  onSearch?: (query: string) => void
  /** 검색 타입 (히스토리에 저장할 때 사용) */
  searchType?: 'product' | 'experience' | 'farm'
  /** 플레이스홀더 */
  placeholder?: string
  /** 자동완성 활성화 */
  enableSuggestions?: boolean
  /** 인기 검색어 활성화 */
  enablePopularKeywords?: boolean
  /** 디바운스 지연 시간 */
  debounceDelay?: number
  /** 추가 클래스명 */
  className?: string
}

export function SearchBox({
  initialQuery = '',
  onSearch,
  searchType,
  placeholder = '검색어를 입력하세요',
  enableSuggestions = true,
  enablePopularKeywords = true,
  debounceDelay = 300,
  className,
}: SearchBoxProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    query,
    suggestions,
    popularKeywords,
    isLoading,
    handleQueryChange,
    clearQuery,
    selectSuggestion,
    hasQuery,
  } = useSearch({
    minLength: 1,
    debounceDelay,
    enableSuggestions,
    enablePopularKeywords,
  })

  // 초기 검색어 설정
  useEffect(() => {
    if (initialQuery) {
      handleQueryChange(initialQuery)
    }
  }, [initialQuery, handleQueryChange])

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [showSuggestions])

  const handleSearch = (searchQuery: string) => {
    const trimmedQuery = searchQuery.trim()
    if (trimmedQuery) {
      // 검색 히스토리에 저장
      addSearchHistory(trimmedQuery, searchType)
      // 부모 컴포넌트의 onSearch 호출
      onSearch?.(trimmedQuery)
      // 추천 UI 닫기
      setShowSuggestions(false)
    }
  }

  const handleQueryChangeWithSearch = (newQuery: string) => {
    handleQueryChange(newQuery)
    setShowSuggestions(true)
  }

  const handleSelectSuggestion = (keyword: string) => {
    selectSuggestion(keyword)
    handleSearch(keyword)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (query.trim()) {
        handleSearch(query)
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <SearchInput
        value={query}
        onChange={handleQueryChangeWithSearch}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => {
          // 약간의 지연을 두어 클릭 이벤트가 먼저 처리되도록
          setTimeout(() => setShowSuggestions(false), 300)
        }}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
      />
      {showSuggestions && (
        <SearchSuggestions
          query={query}
          suggestions={suggestions}
          popularKeywords={popularKeywords}
          isLoading={isLoading}
          onSelect={handleSelectSuggestion}
          onClose={() => setShowSuggestions(false)}
        />
      )}
    </div>
  )
}

