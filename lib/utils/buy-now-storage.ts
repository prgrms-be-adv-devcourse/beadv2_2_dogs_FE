/**
 * 바로 구매(buyNow) 플래그를 sessionStorage로 관리하는 유틸리티
 * sessionStorage는 탭이 닫히면 자동으로 사라지므로 바로 구매 상태 관리에 적합
 */

const BUY_NOW_STORAGE_KEY = 'barofarm-buynow-items'

export interface BuyNowItem {
  productId: number
  quantity: number
  timestamp: number
}

/**
 * sessionStorage에서 바로 구매 아이템 목록 가져오기
 */
export function getBuyNowItems(): BuyNowItem[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = sessionStorage.getItem(BUY_NOW_STORAGE_KEY)
    if (!stored) return []
    return JSON.parse(stored) as BuyNowItem[]
  } catch (error) {
    console.error('[BuyNowStorage] Failed to get buy now items:', error)
    return []
  }
}

/**
 * sessionStorage에 바로 구매 아이템 추가
 */
export function addBuyNowItem(productId: number, quantity: number): void {
  if (typeof window === 'undefined') return

  try {
    const items = getBuyNowItems()
    const existingIndex = items.findIndex((item) => item.productId === productId)

    if (existingIndex >= 0) {
      // 기존 아이템 업데이트
      items[existingIndex] = {
        productId,
        quantity,
        timestamp: Date.now(),
      }
    } else {
      // 새 아이템 추가
      items.push({
        productId,
        quantity,
        timestamp: Date.now(),
      })
    }

    sessionStorage.setItem(BUY_NOW_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('[BuyNowStorage] Failed to add buy now item:', error)
  }
}

/**
 * sessionStorage에서 바로 구매 아이템 제거
 */
export function removeBuyNowItem(productId: number): void {
  if (typeof window === 'undefined') return

  try {
    const items = getBuyNowItems().filter((item) => item.productId !== productId)
    sessionStorage.setItem(BUY_NOW_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('[BuyNowStorage] Failed to remove buy now item:', error)
  }
}

/**
 * 특정 상품이 바로 구매 아이템인지 확인
 */
export function isBuyNowItem(productId: number): boolean {
  if (typeof window === 'undefined') return false
  return getBuyNowItems().some((item) => item.productId === productId)
}

/**
 * 바로 구매 아이템의 수량 가져오기
 */
export function getBuyNowQuantity(productId: number): number | null {
  if (typeof window === 'undefined') return null

  const item = getBuyNowItems().find((item) => item.productId === productId)
  return item ? item.quantity : null
}

/**
 * 모든 바로 구매 아이템 제거
 */
export function clearBuyNowItems(): void {
  if (typeof window === 'undefined') return

  try {
    sessionStorage.removeItem(BUY_NOW_STORAGE_KEY)
  } catch (error) {
    console.error('[BuyNowStorage] Failed to clear buy now items:', error)
  }
}

/**
 * 오래된 바로 구매 아이템 정리 (30분 이상 된 항목)
 */
export function cleanupOldBuyNowItems(): void {
  if (typeof window === 'undefined') return

  try {
    const items = getBuyNowItems()
    const now = Date.now()
    const thirtyMinutes = 30 * 60 * 1000

    const validItems = items.filter((item) => now - item.timestamp < thirtyMinutes)

    if (validItems.length !== items.length) {
      sessionStorage.setItem(BUY_NOW_STORAGE_KEY, JSON.stringify(validItems))
    }
  } catch (error) {
    console.error('[BuyNowStorage] Failed to cleanup old buy now items:', error)
  }
}
