/**
 * 검색 히스토리 관리 유틸리티
 * 로컬 스토리지를 사용하여 검색 기록을 저장
 */

const SEARCH_HISTORY_KEY = 'barofarm_search_history'
const MAX_HISTORY_LENGTH = 10

export interface SearchHistoryItem {
  keyword: string
  timestamp: number
  type?: 'product' | 'experience' | 'farm'
}

/**
 * 검색 히스토리 가져오기
 */
export function getSearchHistory(): SearchHistoryItem[] {
  if (typeof window === 'undefined') return []

  try {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY)
    if (!history) return []
    return JSON.parse(history) as SearchHistoryItem[]
  } catch (error) {
    console.error('검색 히스토리 로드 실패:', error)
    return []
  }
}

/**
 * 검색어 추가
 */
export function addSearchHistory(keyword: string, type?: SearchHistoryItem['type']): void {
  if (typeof window === 'undefined') {
    console.debug('addSearchHistory: window is undefined')
    return
  }
  if (!keyword.trim()) {
    console.debug('addSearchHistory: keyword is empty')
    return
  }

  try {
    const history = getSearchHistory()
    
    // 중복 제거 (같은 키워드가 있으면 제거 후 맨 앞에 추가)
    const filtered = history.filter((item) => item.keyword !== keyword)
    
    const newItem: SearchHistoryItem = {
      keyword: keyword.trim(),
      timestamp: Date.now(),
      type,
    }

    const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_LENGTH)
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated))
    console.debug('검색 히스토리 저장 완료:', updated)
    
    // storage 이벤트 발생 (같은 탭에서도 감지하도록)
    window.dispatchEvent(new Event('searchHistoryUpdated'))
  } catch (error) {
    console.error('검색 히스토리 저장 실패:', error)
  }
}

/**
 * 검색 히스토리 삭제
 */
export function removeSearchHistory(keyword: string): void {
  if (typeof window === 'undefined') return

  try {
    const history = getSearchHistory()
    const filtered = history.filter((item) => item.keyword !== keyword)
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('검색 히스토리 삭제 실패:', error)
  }
}

/**
 * 검색 히스토리 전체 삭제
 */
export function clearSearchHistory(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY)
  } catch (error) {
    console.error('검색 히스토리 전체 삭제 실패:', error)
  }
}

/**
 * 최근 검색어 가져오기
 */
export function getRecentSearches(limit: number = 5): SearchHistoryItem[] {
  return getSearchHistory().slice(0, limit)
}

