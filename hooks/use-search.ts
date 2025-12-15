'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { debounce } from '@/lib/utils/search'
import { searchService } from '@/lib/api/services/search'

export interface UseSearchOptions {
  /** 검색어 최소 길이 */
  minLength?: number
  /** 디바운스 지연 시간 (ms) */
  debounceDelay?: number
  /** 자동완성 활성화 여부 */
  enableSuggestions?: boolean
  /** 인기 검색어 활성화 여부 */
  enablePopularKeywords?: boolean
}

export interface SearchSuggestion {
  keyword: string
  type?: 'product' | 'experience' | 'farm' | 'keyword'
  count?: number
}

export function useSearch(options: UseSearchOptions = {}) {
  const {
    minLength = 1,
    debounceDelay = 300,
    enableSuggestions = true,
    enablePopularKeywords = true,
  } = options

  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [popularKeywords, setPopularKeywords] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // 인기 검색어 로드
  // TODO: 인기 검색어 API가 추가되면 구현
  useEffect(() => {
    if (!enablePopularKeywords) return

    // 현재는 인기 검색어 API가 없으므로 빈 배열로 설정
    setPopularKeywords([])
  }, [enablePopularKeywords])

  // 검색어 자동완성
  const fetchSuggestions = useCallback(
    async (searchQuery: string) => {
      if (!enableSuggestions || searchQuery.length < 2) {
        setSuggestions([])
        return
      }

      // 이전 요청 취소
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      abortControllerRef.current = new AbortController()
      setIsLoading(true)
      setError(null)

      try {
        // 통합 자동완성 API 사용
        const response = await searchService.getAutocomplete(searchQuery)
        // 통합 자동완성 결과를 문자열 배열로 변환
        const allSuggestions: string[] = [
          ...response.products.map((p) => p.productName),
          ...response.farms.map((f) => f.farmName),
          ...response.experiences.map((e) => e.title),
        ]
        setSuggestions(allSuggestions)
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err)
          console.error('검색어 자동완성 실패:', err)
        }
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    },
    [enableSuggestions]
  )

  // 디바운스된 자동완성 함수
  const debouncedFetchSuggestions = useCallback(
    debounce((searchQuery: string) => {
      fetchSuggestions(searchQuery)
    }, debounceDelay),
    [fetchSuggestions, debounceDelay]
  )

  // 검색어 변경 핸들러
  const handleQueryChange = useCallback(
    (newQuery: string) => {
      setQuery(newQuery)
      debouncedFetchSuggestions(newQuery)
    },
    [debouncedFetchSuggestions]
  )

  // 검색어 초기화
  const clearQuery = useCallback(() => {
    setQuery('')
    setSuggestions([])
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }, [])

  // 검색어 선택 (자동완성에서)
  const selectSuggestion = useCallback((suggestion: string) => {
    setQuery(suggestion)
    setSuggestions([])
  }, [])

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return {
    query,
    suggestions,
    popularKeywords,
    isLoading,
    error,
    handleQueryChange,
    clearQuery,
    selectSuggestion,
    hasQuery: query.trim().length >= minLength,
  }
}
