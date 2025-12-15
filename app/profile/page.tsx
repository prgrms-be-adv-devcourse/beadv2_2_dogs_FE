'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { useToast } from '@/hooks/use-toast'
import { Package, Star, Wallet, DollarSign } from 'lucide-react'
import { getAccessToken, setAccessToken } from '@/lib/api/client'
import { authService } from '@/lib/api/services/auth'
import { useCartStore } from '@/lib/cart-store'
import { sellerService } from '@/lib/api/services/seller'
import { depositService } from '@/lib/api/services/payment'

import { ProfileSidebar } from '@/components/profile/profile-sidebar'
import { ProfileOverview } from '@/components/profile/profile-overview'
import { ProfileOrders } from '@/components/profile/profile-orders'
import { ProfileRole } from '@/components/profile/profile-role'
import { ProfileSettings } from '@/components/profile/profile-settings'

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const clearCart = useCartStore((state) => state.clearCart)
  const [activeTab, setActiveTab] = useState('overview')
  const [monthlySettlement, setMonthlySettlement] = useState<number | null>(null)
  const [isLoadingSettlement, setIsLoadingSettlement] = useState(false)
  const [depositBalance, setDepositBalance] = useState<number | null>(null)
  const [isLoadingDeposit, setIsLoadingDeposit] = useState(false)

  const user = {
    name: '김**',
    email: 'user@example.com',
    phone: '010-1234-5678',
    joinDate: '2024.01.15',
    avatar: '/placeholder.svg',
    role: 'BUYER', // BUYER or SELLER
  } as const

  const handleLogout = async () => {
    try {
      try {
        await authService.logout()
      } catch (error) {
        console.warn('로그아웃 API 호출 실패 (로컬 로그아웃 진행):', error)
      }

      setAccessToken(null)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('dummyUser')
        localStorage.removeItem('accessToken')
      }

      try {
        clearCart()
      } catch (error) {
        console.warn('장바구니 비우기 실패 (계속 진행):', error)
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('authStateChanged'))
      }

      toast({
        title: '로그아웃되었습니다',
        description: '다음에 또 만나요!',
      })

      router.push('/')
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error)
      toast({
        title: '로그아웃 실패',
        description: '다시 시도해주세요.',
        variant: 'destructive',
      })
    }
  }

  // 이번달 정산금액 조회 (판매자만)
  useEffect(() => {
    const fetchMonthlySettlement = async () => {
      if (user.role !== 'SELLER') return

      setIsLoadingSettlement(true)
      try {
        const now = new Date()
        const year = now.getFullYear()
        const month = now.getMonth() + 1

        const response = await sellerService.getSettlements({
          page: 1,
          size: 100,
        })

        const currentMonthSettlements = response.content.filter((settlement) => {
          const settlementDate = new Date(settlement.period.start)
          return (
            settlementDate.getFullYear() === year &&
            settlementDate.getMonth() + 1 === month &&
            settlement.status === 'COMPLETED'
          )
        })

        const totalAmount = currentMonthSettlements.reduce(
          (sum, settlement) => sum + settlement.netAmount,
          0
        )

        setMonthlySettlement(totalAmount)
      } catch (error) {
        console.error('정산금액 조회 실패:', error)
      } finally {
        setIsLoadingSettlement(false)
      }
    }

    fetchMonthlySettlement()
  }, [user.role])

  // 예치금 조회
  useEffect(() => {
    const fetchDepositBalance = async () => {
      setIsLoadingDeposit(true)
      try {
        const response = await depositService.getDeposit()
        setDepositBalance(response.balance)
      } catch (error: any) {
        if (error?.status === 404) {
          setDepositBalance(0)
        } else {
          setDepositBalance(0)
        }
      } finally {
        setIsLoadingDeposit(false)
      }
    }

    fetchDepositBalance()
  }, [])

  const stats = [
    { label: '주문 내역', value: '12', icon: Package },
    { label: '작성한 리뷰', value: '5', icon: Star },
  ]

  const depositStat = {
    label: '예치금',
    value: isLoadingDeposit
      ? '조회 중...'
      : depositBalance !== null
        ? `${depositBalance.toLocaleString()}원`
        : '0원',
    icon: Wallet,
  }

  const sellerStats =
    user.role === 'SELLER'
      ? [
          {
            label: '이번 달 정산금액',
            value: isLoadingSettlement
              ? '조회 중...'
              : monthlySettlement !== null
                ? `${monthlySettlement.toLocaleString()}원`
                : '0원',
            icon: DollarSign,
          },
        ]
      : []

  const recentOrders = [
    {
      id: 'ORD-001234',
      date: '2024.12.10',
      status: '배송 완료',
      items: ['유기농 방울토마토', '무농약 상추'],
      total: 25000,
    },
    {
      id: 'ORD-001233',
      date: '2024.12.08',
      status: '배송 중',
      items: ['친환경 딸기'],
      total: 15000,
    },
    {
      id: 'ORD-001232',
      date: '2024.12.05',
      status: '배송 준비',
      items: ['유기농 감자'],
      total: 12000,
    },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <ProfileOverview
            user={user}
            stats={stats}
            depositStat={depositStat}
            sellerStats={sellerStats}
            recentOrders={recentOrders}
            onTabChange={setActiveTab}
          />
        )
      case 'orders':
        return <ProfileOrders orders={recentOrders} />
      case 'role':
        return <ProfileRole userRole={user.role} />
      case 'settings':
        return <ProfileSettings user={user} onLogout={handleLogout} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FAF8] dark:bg-gray-950">
      <Header />

      <div className="container mx-auto px-4 md:px-6 py-12 max-w-6xl">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white tracking-tight">
            마이페이지
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-normal">
            내 정보와 주문 내역을 한눈에 관리하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="md:col-span-3 lg:col-span-3">
            <ProfileSidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onLogout={handleLogout}
              userRole={user.role}
            />
          </div>

          {/* Right Content */}
          <div className="md:col-span-9 lg:col-span-9">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}
