'use client'

import { useState, useEffect, useCallback } from 'react'
import { notificationService } from '@/lib/api'
import type { Notification } from '@/lib/api/types'

interface UseNotificationsOptions {
  /** 폴링 간격 (밀리초), 기본값 30000 (30초) */
  pollInterval?: number
  /** 자동 폴링 활성화 여부, 기본값 true */
  autoPoll?: boolean
}

export function useNotifications(options: UseNotificationsOptions = {}) {
  const { pollInterval = 30000, autoPoll = true } = options

  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // 알림 목록 조회
  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await notificationService.getNotifications()
      setNotifications(response.content || [])
    } catch (err) {
      // API 호출 실패 시 (백엔드 미연결 등) 빈 배열로 설정
      // Mock 데이터는 알림 페이지에서 처리
      const error = err as { status?: number; message?: string }
      if (error.status === 0 || error.status === 404 || !error.status) {
        // 네트워크 오류나 404는 조용히 빈 배열로 설정
        setNotifications([])
      } else {
        setError(err instanceof Error ? err : new Error('알림 조회 실패'))
        console.warn('알림 조회 실패:', error.message || error)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  // 읽지 않은 알림 개수 조회
  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await notificationService.getUnreadCount()
      setUnreadCount(response.count || 0)
    } catch (err) {
      // API 호출 실패 시 (백엔드 미연결 등) Mock 데이터 사용
      // 네트워크 오류나 404 등의 경우 조용히 Mock 데이터 사용
      const error = err as { status?: number; message?: string }
      if (error.status === 0 || error.status === 404 || !error.status) {
        // Mock 데이터: 읽지 않은 알림 개수 (개발용)
        setUnreadCount(2)
      } else {
        // 기타 에러는 로그만 출력하고 0으로 설정
        console.warn('읽지 않은 알림 개수 조회 실패:', error.message || error)
        setUnreadCount(0)
      }
    }
  }, [])

  // 알림 읽음 처리
  const markAsRead = useCallback(async (id: number) => {
    try {
      await notificationService.markAsRead(id)
      setNotifications((prev) =>
        prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
      )
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch (err) {
      // API 호출 실패 시에도 로컬 상태는 업데이트 (오프라인 모드 지원)
      const error = err as { status?: number; message?: string }
      if (error.status === 0 || error.status === 404 || !error.status) {
        // 네트워크 오류는 로컬 상태만 업데이트
        setNotifications((prev) =>
          prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
        )
        setUnreadCount((prev) => Math.max(0, prev - 1))
      } else {
        console.warn('알림 읽음 처리 실패:', error.message || error)
        throw err
      }
    }
  }, [])

  // 모든 알림 읽음 처리
  const markAllAsRead = useCallback(async () => {
    try {
      await notificationService.markAllAsRead()
      setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
      setUnreadCount(0)
    } catch (err) {
      // API 호출 실패 시에도 로컬 상태는 업데이트
      const error = err as { status?: number; message?: string }
      if (error.status === 0 || error.status === 404 || !error.status) {
        setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
        setUnreadCount(0)
      } else {
        console.warn('모든 알림 읽음 처리 실패:', error.message || error)
        throw err
      }
    }
  }, [])

  // 알림 삭제
  const deleteNotification = useCallback(async (id: number) => {
    try {
      await notificationService.deleteNotification(id)
      const deletedNotification = notifications.find((n) => n.id === id)
      setNotifications((prev) => prev.filter((notif) => notif.id !== id))
      // 읽지 않은 알림이었다면 개수 감소
      if (deletedNotification && !deletedNotification.isRead) {
        setUnreadCount((prev) => Math.max(0, prev - 1))
      }
    } catch (err) {
      // API 호출 실패 시에도 로컬 상태는 업데이트
      const error = err as { status?: number; message?: string }
      if (error.status === 0 || error.status === 404 || !error.status) {
        const deletedNotification = notifications.find((n) => n.id === id)
        setNotifications((prev) => prev.filter((notif) => notif.id !== id))
        if (deletedNotification && !deletedNotification.isRead) {
          setUnreadCount((prev) => Math.max(0, prev - 1))
        }
      } else {
        console.warn('알림 삭제 실패:', error.message || error)
        throw err
      }
    }
  }, [notifications])

  // 초기 로드 및 폴링
  useEffect(() => {
    fetchUnreadCount()
    if (autoPoll) {
      fetchNotifications()
      const interval = setInterval(() => {
        fetchUnreadCount()
      }, pollInterval)
      return () => clearInterval(interval)
    }
  }, [fetchUnreadCount, fetchNotifications, autoPoll, pollInterval])

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refresh: () => {
      fetchNotifications()
      fetchUnreadCount()
    },
  }
}

