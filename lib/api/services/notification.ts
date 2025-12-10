import { notificationApi } from '../client'
import type { Notification, PaginatedResponse, PaginationParams } from '../types'

export const notificationService = {
  // 알림 목록 조회
  async getNotifications(params?: PaginationParams): Promise<PaginatedResponse<Notification>> {
    return notificationApi.get<PaginatedResponse<Notification>>('/api/notifications', { params })
  },

  // 읽지 않은 알림 개수
  async getUnreadCount(): Promise<{ count: number }> {
    return notificationApi.get<{ count: number }>('/api/notifications/unread-count')
  },

  // 알림 읽음 처리
  async markAsRead(id: number): Promise<void> {
    return notificationApi.patch(`/api/notifications/${id}/read`)
  },

  // 모든 알림 읽음 처리
  async markAllAsRead(): Promise<void> {
    return notificationApi.patch('/api/notifications/read-all')
  },

  // 알림 삭제
  async deleteNotification(id: number): Promise<void> {
    return notificationApi.delete(`/api/notifications/${id}`)
  },
}
