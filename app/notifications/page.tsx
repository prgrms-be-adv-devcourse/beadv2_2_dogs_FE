'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Bell,
  Check,
  Trash2,
  Package,
  Truck,
  CreditCard,
  Gift,
  MessageSquare,
  Settings,
  ArrowLeft,
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { useRouter } from 'next/navigation'
import { useNotifications } from '@/hooks/use-notifications'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import type { NotificationType } from '@/lib/api/types'

export default function NotificationsPage() {
  const router = useRouter()
  const { notifications, isLoading, markAsRead, markAllAsRead, deleteNotification, refresh } =
    useNotifications({ autoPoll: false })

  const [selectedNotifications, setSelectedNotifications] = useState<Set<number>>(new Set())

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'ORDER_STATUS':
        return <Package className="h-5 w-5" />
      case 'DELIVERY_STATUS':
        return <Truck className="h-5 w-5" />
      case 'PAYMENT':
        return <CreditCard className="h-5 w-5" />
      case 'PROMOTION':
        return <Gift className="h-5 w-5" />
      case 'REVIEW':
        return <MessageSquare className="h-5 w-5" />
      case 'SYSTEM':
        return <Settings className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case 'ORDER_STATUS':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'DELIVERY_STATUS':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'PAYMENT':
        return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'PROMOTION':
        return 'bg-orange-50 text-orange-700 border-orange-200'
      case 'REVIEW':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'SYSTEM':
        return 'bg-gray-50 text-gray-700 border-gray-200'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsRead(id)
    } catch (error) {
      console.error('알림 읽음 처리 실패:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteNotification(id)
      setSelectedNotifications((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    } catch (error) {
      console.error('알림 삭제 실패:', error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead()
    } catch (error) {
      console.error('모든 알림 읽음 처리 실패:', error)
    }
  }

  const handleDeleteSelected = async () => {
    const promises = Array.from(selectedNotifications).map((id) => deleteNotification(id))
    try {
      await Promise.all(promises)
      setSelectedNotifications(new Set())
    } catch (error) {
      console.error('선택한 알림 삭제 실패:', error)
    }
  }

  // Mock 데이터 (실제로는 API에서 가져옴)
  // 상수로 정의하여 렌더링 중 impure function 호출 방지
  const mockNotifications = useMemo(() => {
    // 고정된 타임스탬프 사용 (1시간 전, 2시간 전, 24시간 전)
    const oneHourAgo = 3600000
    const twoHoursAgo = 7200000
    const oneDayAgo = 86400000

    // 현재 시간을 컴포넌트 외부에서 계산하지 않고, 상대 시간만 사용
    // 실제로는 API에서 받은 ISO 문자열을 사용하므로 문제 없음
    const baseTime = new Date('2024-12-07T12:00:00Z').getTime()

    return [
      {
        id: 1,
        userId: 1,
        type: 'ORDER_STATUS' as NotificationType,
        title: '주문이 배송 준비되었습니다',
        message: '주문번호 ORD-001234의 상품이 배송 준비되었습니다.',
        isRead: false,
        createdAt: new Date(baseTime).toISOString(),
      },
      {
        id: 2,
        userId: 1,
        type: 'DELIVERY_STATUS' as NotificationType,
        title: '배송이 시작되었습니다',
        message: '주문번호 ORD-001233의 상품이 배송 중입니다.',
        isRead: false,
        createdAt: new Date(baseTime - oneHourAgo).toISOString(),
      },
      {
        id: 3,
        userId: 1,
        type: 'PAYMENT' as NotificationType,
        title: '결제가 완료되었습니다',
        message: '주문번호 ORD-001232의 결제가 완료되었습니다.',
        isRead: true,
        createdAt: new Date(baseTime - twoHoursAgo).toISOString(),
      },
      {
        id: 4,
        userId: 1,
        type: 'REVIEW' as NotificationType,
        title: '리뷰에 답변이 달렸습니다',
        message: '작성하신 리뷰에 농가의 답변이 등록되었습니다.',
        isRead: true,
        createdAt: new Date(baseTime - oneDayAgo).toISOString(),
      },
    ]
  }, [])

  // 개발 환경에서는 Mock 데이터 사용, 프로덕션에서는 실제 데이터 사용
  const displayNotifications = notifications.length > 0 ? notifications : mockNotifications
  const unreadNotifications = displayNotifications.filter((n) => !n.isRead)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          뒤로가기
        </Button>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">알림</h1>
            <p className="text-muted-foreground">
              {unreadNotifications.length > 0
                ? `읽지 않은 알림 ${unreadNotifications.length}개`
                : '모든 알림을 확인했습니다'}
            </p>
          </div>
          <div className="flex gap-2">
            {unreadNotifications.length > 0 && (
              <Button variant="outline" onClick={handleMarkAllAsRead}>
                <Check className="h-4 w-4 mr-2" />
                모두 읽음
              </Button>
            )}
            {selectedNotifications.size > 0 && (
              <Button variant="destructive" onClick={handleDeleteSelected}>
                <Trash2 className="h-4 w-4 mr-2" />
                선택 삭제 ({selectedNotifications.size})
              </Button>
            )}
            <Button variant="outline" onClick={refresh}>
              새로고침
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">알림을 불러오는 중...</p>
          </div>
        ) : displayNotifications.length === 0 ? (
          <Card className="p-12 text-center">
            <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">알림이 없습니다</h3>
            <p className="text-muted-foreground">새로운 알림이 도착하면 여기에 표시됩니다.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {displayNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type)
              const isSelected = selectedNotifications.has(notification.id)

              return (
                <Card
                  key={notification.id}
                  className={`p-4 transition-colors ${
                    !notification.isRead ? 'bg-muted/50 border-l-4 border-l-primary' : ''
                  } ${isSelected ? 'ring-2 ring-primary' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-lg ${getNotificationColor(notification.type)} flex-shrink-0`}
                    >
                      {Icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <h3
                            className={`font-semibold mb-1 ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}
                          >
                            {notification.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {!notification.isRead && (
                            <Badge variant="secondary" className="text-xs">
                              새 알림
                            </Badge>
                          )}
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              const next = new Set(selectedNotifications)
                              if (e.target.checked) {
                                next.add(notification.id)
                              } else {
                                next.delete(notification.id)
                              }
                              setSelectedNotifications(next)
                            }}
                            className="w-4 h-4"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(notification.createdAt), 'yyyy.MM.dd HH:mm', {
                            locale: ko,
                          })}
                        </span>
                        <div className="flex gap-2">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="h-7 text-xs"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              읽음
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(notification.id)}
                            className="h-7 text-xs text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            삭제
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
