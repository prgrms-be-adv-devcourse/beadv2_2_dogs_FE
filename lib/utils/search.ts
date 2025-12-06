/**
 * 검색 관련 유틸리티 함수
 */

/**
 * 디바운스된 함수 생성
 * @param func 실행할 함수
 * @param delay 지연 시간 (ms)
 * @returns 디바운스된 함수
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 검색어에서 키워드 하이라이트
 * @param text 원본 텍스트
 * @param keyword 하이라이트할 키워드
 * @returns 하이라이트된 JSX 요소
 */
export function highlightKeyword(text: string, keyword: string): string {
  if (!keyword.trim()) return text

  const regex = new RegExp(`(${keyword})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>')
}

/**
 * 검색어 정규화 (공백 제거, 소문자 변환)
 */
export function normalizeSearchQuery(query: string): string {
  return query.trim().toLowerCase()
}

/**
 * 검색어 유효성 검사 (최소 길이 등)
 */
export function isValidSearchQuery(query: string, minLength: number = 1): boolean {
  return normalizeSearchQuery(query).length >= minLength
}

/**
 * 검색어 자동완성을 위한 최소 길이
 */
export const MIN_SUGGESTION_LENGTH = 2

/**
 * 검색어 추천을 위한 최소 길이
 */
export const MIN_SEARCH_LENGTH = 1

