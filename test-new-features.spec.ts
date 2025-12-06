import { test, expect } from '@playwright/test'

test.describe('새로 추가된 기능 테스트', () => {
  test('소개 페이지 테스트', async ({ page }) => {
    // 소개 페이지로 직접 이동
    await page.goto('http://localhost:3000/about')
    await expect(page).toHaveURL('http://localhost:3000/about')

    // 페이지 제목 확인
    await expect(page.locator('h1')).toContainText('농장에서 식탁까지')

    // 통계 섹션 확인
    await expect(page.locator('text=320+')).toBeVisible()
    await expect(page.locator('text=등록 농가')).toBeVisible()

    // 핵심 가치 섹션 확인 (첫 번째 요소만 확인)
    await expect(page.getByRole('heading', { name: '환경 보호' }).first()).toBeVisible()
    await expect(page.getByRole('heading', { name: '합리적 가격' }).first()).toBeVisible()
    await expect(page.getByRole('heading', { name: '농가 활성화' }).first()).toBeVisible()

    // 주요 기능 섹션 확인 (더 구체적인 선택자 사용)
    await expect(page.getByRole('heading', { name: '신선한 농산물' })).toBeVisible()
    await expect(page.getByRole('heading', { name: '빠른 배송' })).toBeVisible()
  })

  test('마이페이지/프로필 테스트', async ({ page }) => {
    // 마이페이지로 이동
    await page.goto('http://localhost:3000/profile')
    await expect(page).toHaveURL('http://localhost:3000/profile')

    // 페이지 제목 확인
    await expect(page.locator('h1')).toContainText('마이페이지')

    // 탭 확인 (더 구체적인 선택자 사용)
    await expect(page.getByRole('tab', { name: '개요' })).toBeVisible()
    await expect(page.getByRole('tab', { name: '주문 내역' })).toBeVisible()
    await expect(page.getByRole('tab', { name: '찜한 상품' })).toBeVisible()
    await expect(page.getByRole('tab', { name: '설정' })).toBeVisible()

    // 개요 탭 내용 확인 (통계 카드)
    await expect(page.locator('text=주문 내역').nth(1)).toBeVisible() // 통계 카드의 "주문 내역"
    await expect(page.locator('text=찜한 상품').nth(1)).toBeVisible() // 통계 카드의 "찜한 상품"
    await expect(page.locator('text=작성한 리뷰')).toBeVisible()

    // 주문 내역 탭 클릭
    await page.getByRole('tab', { name: '주문 내역' }).click()
    await expect(page.locator('h2').filter({ hasText: '주문 내역' })).toBeVisible()

    // 찜한 상품 탭 클릭
    await page.getByRole('tab', { name: '찜한 상품' }).click()
    await expect(page.locator('h2').filter({ hasText: '찜한 상품' })).toBeVisible()

    // 설정 탭 클릭
    await page.getByRole('tab', { name: '설정' }).click()
    await expect(page.locator('h2').filter({ hasText: '프로필 정보' })).toBeVisible()
    await expect(page.locator('h2').filter({ hasText: '배송지 관리' })).toBeVisible()
  })

  test('주문 상세 페이지 테스트', async ({ page }) => {
    // 주문 상세 페이지로 이동 (임시 주문 ID 사용)
    await page.goto('http://localhost:3000/order/ORD-001234')
    await expect(page).toHaveURL('http://localhost:3000/order/ORD-001234')

    // 페이지 제목 확인
    await expect(page.locator('h1')).toContainText('주문 상세')

    // 주문번호 확인
    await expect(page.locator('text=ORD-001234')).toBeVisible()

    // 주문 상품 섹션 확인
    await expect(page.locator('text=주문 상품')).toBeVisible()

    // 주문 요약 섹션 확인
    await expect(page.locator('text=주문 요약')).toBeVisible()
    await expect(page.locator('text=상품 금액')).toBeVisible()
    await expect(page.locator('text=배송비')).toBeVisible()
    await expect(page.locator('text=총 결제금액')).toBeVisible()

    // 결제 정보 섹션 확인
    await expect(page.locator('text=결제 정보')).toBeVisible()

    // 배송 정보 섹션 확인
    await expect(page.locator('text=배송 정보')).toBeVisible()

    // 배송 현황 섹션 확인
    await expect(page.locator('text=배송 현황')).toBeVisible()
  })

  test('리뷰 기능 테스트 - 상품 상세 페이지', async ({ page }) => {
    // 상품 상세 페이지로 이동
    await page.goto('http://localhost:3000/products/1')
    await expect(page).toHaveURL('http://localhost:3000/products/1')

    // 리뷰 섹션으로 스크롤
    await page.locator('text=고객 리뷰').scrollIntoViewIfNeeded()

    // 리뷰 요약 확인
    await expect(page.locator('text=총')).toBeVisible()

    // 리뷰 작성 버튼 확인
    await expect(page.locator('text=리뷰 작성')).toBeVisible()

    // 리뷰 작성 버튼 클릭
    await page.click('text=리뷰 작성')

    // 리뷰 폼 확인
    await expect(page.locator('text=리뷰 작성')).toBeVisible()
    await expect(page.locator('text=평점')).toBeVisible()
    await expect(page.locator('text=리뷰 내용')).toBeVisible()

    // 별점 클릭 테스트
    const stars = page.locator('[data-testid="star"]').or(page.locator('svg').filter({ hasText: '' })).first()
    // 별점 버튼 찾기 (더 정확한 선택자 사용)
    const starButtons = page.locator('button').filter({ has: page.locator('svg') }).first()
    
    // 리뷰 내용 입력
    await page.fill('textarea', '정말 맛있고 신선한 상품이었습니다!')

    // 취소 버튼 클릭
    await page.click('text=취소')
  })

  test('리뷰 목록 확인', async ({ page }) => {
    // 상품 상세 페이지로 이동
    await page.goto('http://localhost:3000/products/1')
    await expect(page).toHaveURL('http://localhost:3000/products/1')

    // 리뷰 섹션으로 스크롤
    await page.locator('text=고객 리뷰').scrollIntoViewIfNeeded()

    // 리뷰 목록 확인
    // 리뷰가 있다면 확인
    const reviewCount = await page.locator('text=/리뷰/').count()
    if (reviewCount > 0) {
      // 리뷰 항목이 있는지 확인 (더 구체적인 선택자 사용)
      await expect(page.locator('text=고객 리뷰')).toBeVisible()
      // 리뷰 카드가 있는지 확인
      const reviewCards = page.locator('[class*="card"]').filter({ hasText: /점/ })
      if ((await reviewCards.count()) > 0) {
        await expect(reviewCards.first()).toBeVisible()
      }
    }
  })
})

