'use client'

import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useNotifications } from '@/hooks/use-notifications'
import { cn } from '@/lib/utils'

interface NotificationIconProps {
  className?: string
}

export function NotificationIcon({ className }: NotificationIconProps) {
  const { unreadCount } = useNotifications({ autoPoll: true, pollInterval: 30000 })

  return (
    <Button variant="ghost" size="icon" className={cn('relative', className)} asChild>
      <Link href="/notifications">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
        <span className="sr-only">알림</span>
      </Link>
    </Button>
  )
}
