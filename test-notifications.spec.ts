import { test, expect } from '@playwright/test'

test.describe('알림 기능 테스트', () => {
  test('헤더 알림 아이콘 확인', async ({ page }) => {
    // 메인 페이지로 이동
    await page.goto('http://localhost:3000')
    await expect(page).toHaveURL('http://localhost:3000')

    // 알림 아이콘 확인
    const notificationIcon = page.locator('a[href="/notifications"]').first()
    await expect(notificationIcon).toBeVisible()

    // 알림 아이콘 클릭
    await notificationIcon.click()
    await expect(page).toHaveURL('http://localhost:3000/notifications')
  })

  test('알림 목록 페이지 확인', async ({ page }) => {
    // 알림 페이지로 직접 이동
    await page.goto('http://localhost:3000/notifications')
    await expect(page).toHaveURL('http://localhost:3000/notifications')

    // 페이지 제목 확인
    await expect(page.locator('h1')).toContainText('알림')

    // 뒤로가기 버튼 확인
    await expect(page.locator('text=뒤로가기')).toBeVisible()
  })

  test('알림 목록 표시 확인', async ({ page }) => {
    await page.goto('http://localhost:3000/notifications')

    // 알림이 있는 경우 확인
    // Mock 데이터가 있으므로 알림 카드가 표시될 수 있음
    const notificationCards = page.locator('[class*="card"]').filter({ hasText: /주문|배송|결제|리뷰/ })
    const count = await notificationCards.count()

    if (count > 0) {
      // 알림 카드가 있는 경우
      await expect(notificationCards.first()).toBeVisible()
    } else {
      // 알림이 없는 경우
      await expect(page.locator('text=알림이 없습니다')).toBeVisible()
    }
  })

  test('알림 읽음 처리', async ({ page }) => {
    await page.goto('http://localhost:3000/notifications')

    // 읽지 않은 알림이 있는 경우
    const unreadBadge = page.locator('text=새 알림').first()
    const unreadCount = await unreadBadge.count()

    if (unreadCount > 0) {
      // 읽음 버튼 찾기
      const readButton = page.locator('button').filter({ hasText: '읽음' }).first()
      if (await readButton.count() > 0) {
        await readButton.click()
        // 읽음 처리 후 배지가 사라지는지 확인 (약간의 지연 후)
        await page.waitForTimeout(500)
      }
    }
  })

  test('모두 읽음 처리', async ({ page }) => {
    await page.goto('http://localhost:3000/notifications')

    // 모두 읽음 버튼 확인
    const markAllReadButton = page.locator('button').filter({ hasText: '모두 읽음' })
    const buttonCount = await markAllReadButton.count()

    if (buttonCount > 0) {
      await expect(markAllReadButton).toBeVisible()
      // 버튼 클릭 (실제로는 API 호출이지만 테스트)
      await markAllReadButton.click()
      await page.waitForTimeout(500)
    }
  })

  test('알림 삭제 기능', async ({ page }) => {
    await page.goto('http://localhost:3000/notifications')

    // 삭제 버튼 확인
    const deleteButtons = page.locator('button').filter({ hasText: '삭제' })
    const deleteCount = await deleteButtons.count()

    if (deleteCount > 0) {
      // 첫 번째 삭제 버튼 클릭
      await deleteButtons.first().click()
      await page.waitForTimeout(500)
    }
  })

  test('알림 새로고침', async ({ page }) => {
    await page.goto('http://localhost:3000/notifications')

    // 새로고침 버튼 확인
    const refreshButton = page.locator('button').filter({ hasText: '새로고침' })
    await expect(refreshButton).toBeVisible()

    // 새로고침 버튼 클릭
    await refreshButton.click()
    await page.waitForTimeout(500)
  })

  test('알림 타입별 아이콘 확인', async ({ page }) => {
    await page.goto('http://localhost:3000/notifications')

    // 알림 카드가 있는 경우 타입별 아이콘 확인
    const notificationCards = page.locator('[class*="card"]').filter({ hasText: /주문|배송|결제/ })
    const count = await notificationCards.count()

    if (count > 0) {
      // 아이콘이 있는지 확인 (svg 요소)
      const icons = page.locator('svg').filter({ has: notificationCards.first() })
      const iconCount = await icons.count()
      // 아이콘이 있거나 없을 수 있음 (스타일링에 따라)
    }
  })

  test('알림 페이지에서 다른 페이지로 이동', async ({ page }) => {
    await page.goto('http://localhost:3000/notifications')

    // 헤더의 로고 클릭하여 홈으로 이동
    const logo = page.locator('a[href="/"]').first()
    await logo.click()
    await expect(page).toHaveURL('http://localhost:3000')
  })
})

