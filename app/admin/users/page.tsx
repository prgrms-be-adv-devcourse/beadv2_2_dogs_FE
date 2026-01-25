'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { adminService } from '@/lib/api/services/admin'
import { authService } from '@/lib/api/services/auth'
import type {
  AdminUserListParams,
  AdminUserSummaryResponse,
  AdminUserType,
  AdminUserState,
} from '@/lib/api/types'
import type { SellerStatus } from '@/lib/api/types/admin'

const USER_TYPE_OPTIONS: { value: AdminUserType | 'ALL'; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'SELLER', label: '판매자' },
  { value: 'CUSTOMER', label: '일반회원' },
  { value: 'ADMIN', label: '관리자' },
]

const USER_STATE_OPTIONS: { value: AdminUserState | 'ALL'; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'ACTIVE', label: '활성' },
  { value: 'SUSPENDED', label: '정지' },
  { value: 'BLOCKED', label: '차단' },
  { value: 'WITHDRAWN', label: '탈퇴' },
]

const SELLER_ACTIONS: { value: SellerStatus; label: string }[] = [
  { value: 'APPROVED' as SellerStatus, label: '승인' },
  { value: 'REJECTED' as SellerStatus, label: '거절' },
  { value: 'SUSPENDED' as SellerStatus, label: '정지' },
]

const formatDateTime = (value?: string | null) => {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString()
}

const formatUserType = (value: AdminUserType) => {
  const match = USER_TYPE_OPTIONS.find((item) => item.value === value)
  return match ? match.label : value
}

const formatUserState = (value: AdminUserState) => {
  const match = USER_STATE_OPTIONS.find((item) => item.value === value)
  return match ? match.label : value
}

export default function AdminUsersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState<AdminUserSummaryResponse[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(20)
  const [sort] = useState('createdAt,desc')
  const [typeFilter, setTypeFilter] = useState<AdminUserType | 'ALL'>('ALL')
  const [stateFilter, setStateFilter] = useState<AdminUserState | 'ALL'>('ALL')
  const [keywordInput, setKeywordInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const [actionTarget, setActionTarget] = useState<{
    user: AdminUserSummaryResponse
    status: SellerStatus
  } | null>(null)
  const [reason, setReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const checkRole = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        if (currentUser.role !== 'ADMIN') {
          setIsAuthorized(false)
          router.replace('/')
          return
        }
        setIsAuthorized(true)
      } catch {
        setIsAuthorized(false)
        router.replace('/login')
      }
    }

    void checkRole()
  }, [router])

  const requestParams = useMemo<AdminUserListParams>(
    () => ({
      type: typeFilter === 'ALL' ? undefined : typeFilter,
      state: stateFilter === 'ALL' ? undefined : stateFilter,
      keyword: keyword.trim() ? keyword.trim() : undefined,
      page,
      size,
      sort,
    }),
    [typeFilter, stateFilter, keyword, page, size, sort]
  )

  useEffect(() => {
    if (!isAuthorized) return

    const fetchUsers = async () => {
      setIsLoading(true)
      try {
        const data = await adminService.getUsers(requestParams)
        setUsers(data.content || [])
        setTotalPages(data.totalPages || 0)
        setTotalElements(data.totalElements || 0)
      } catch (error) {
        console.error('Failed to load admin users:', error)
        toast({
          title: '사용자 목록 조회 실패',
          description: '잠시 후 다시 시도해 주세요.',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    void fetchUsers()
  }, [isAuthorized, requestParams, toast])

  const handleSearch = () => {
    setPage(0)
    setKeyword(keywordInput)
  }

  const handleStatusChange = async () => {
    if (!actionTarget) return
    setIsSubmitting(true)
    try {
      await adminService.updateSellerStatus(actionTarget.user.userId, {
        sellerStatus: actionTarget.status,
        reason: reason.trim() ? reason.trim() : undefined,
      })
      toast({
        title: '처리 완료',
        description: '상태가 변경되었습니다.',
      })
      setActionTarget(null)
      setReason('')
      const data = await adminService.getUsers(requestParams)
      setUsers(data.content || [])
      setTotalPages(data.totalPages || 0)
      setTotalElements(data.totalElements || 0)
    } catch (error) {
      console.error('Failed to update seller status:', error)
      toast({
        title: '처리 실패',
        description: '상태 변경을 완료하지 못했습니다.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isSeller = (user: AdminUserSummaryResponse) => user.userType === 'SELLER'

  if (isAuthorized === false) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{'관리자 사용자 관리'}</h1>
            <p className="text-sm text-muted-foreground">
              {'필터를 적용하여 사용자 목록을 관리하세요.'}
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Select
                value={typeFilter}
                onValueChange={(value) => setTypeFilter(value as AdminUserType | 'ALL')}
              >
                <SelectTrigger className="w-full sm:w-44">
                  <SelectValue placeholder={'유형'} />
                </SelectTrigger>
                <SelectContent>
                  {USER_TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={stateFilter}
                onValueChange={(value) => setStateFilter(value as AdminUserState | 'ALL')}
              >
                <SelectTrigger className="w-full sm:w-44">
                  <SelectValue placeholder={'상태'} />
                </SelectTrigger>
                <SelectContent>
                  {USER_STATE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-1 flex-col gap-2 sm:flex-row">
              <Input
                value={keywordInput}
                onChange={(event) => setKeywordInput(event.target.value)}
                placeholder={'이메일 또는 이름 검색'}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    handleSearch()
                  }
                }}
              />
              <Button onClick={handleSearch} className="shrink-0">
                {'검색'}
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>User Type</TableHead>
                <TableHead>User State</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>{'액션'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9} className="py-8 text-center text-muted-foreground">
                    {'로딩 중...'}
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="py-8 text-center text-muted-foreground">
                    {'조회 결과가 없습니다.'}
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell className="font-mono text-xs">{user.userId}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.name || '-'}</TableCell>
                    <TableCell>{user.phone || '-'}</TableCell>
                    <TableCell>{formatUserType(user.userType)}</TableCell>
                    <TableCell>{formatUserState(user.userState)}</TableCell>
                    <TableCell>{formatDateTime(user.lastLoginAt)}</TableCell>
                    <TableCell>{formatDateTime(user.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {SELLER_ACTIONS.map((action) => (
                          <Button
                            key={action.value}
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={!isSeller(user)}
                            onClick={() => {
                              setActionTarget({ user, status: action.value })
                              setReason('')
                            }}
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>{`총 ${totalElements} 건`}</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page <= 0 || isLoading}
            >
              {'이전'}
            </Button>
            <span>{`${page + 1} / ${Math.max(totalPages, 1)}`}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev))}
              disabled={page + 1 >= totalPages || isLoading}
            >
              {'다음'}
            </Button>
            <Select
              value={String(size)}
              onValueChange={(value) => {
                setSize(Number(value))
                setPage(0)
              }}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 30, 50].map((value) => (
                  <SelectItem key={value} value={String(value)}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </main>

      <Dialog
        open={Boolean(actionTarget)}
        onOpenChange={(open) => {
          if (!open) {
            setActionTarget(null)
            setReason('')
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{'상태 변경'}</DialogTitle>
            <DialogDescription>
              {actionTarget ? `사용자 ${actionTarget.user.email} 상태를 변경합니다.` : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {actionTarget ? `선택된 액션: ${actionTarget.status}` : ''}
            </p>
            <Textarea
              rows={3}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder={'변경 사유 (선택)'}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setActionTarget(null)
                setReason('')
              }}
            >
              {'취소'}
            </Button>
            <Button type="button" onClick={handleStatusChange} disabled={isSubmitting}>
              {isSubmitting ? '처리 중...' : '확인'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
