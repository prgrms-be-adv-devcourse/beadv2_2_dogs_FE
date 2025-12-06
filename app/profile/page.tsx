'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  Edit,
  Phone,
  Mail,
  Calendar,
  ShoppingBag,
  Star,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/header'
import { useRouter } from 'next/navigation'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  const user = {
    name: '김**',
    email: 'user@example.com',
    phone: '010-1234-5678',
    joinDate: '2024.01.15',
    avatar: '/placeholder.svg',
  }

  const stats = [
    { label: '주문 내역', value: '12', icon: Package },
    { label: '찜한 상품', value: '8', icon: Heart },
    { label: '작성한 리뷰', value: '5', icon: Star },
  ]

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

  const favoriteProducts = [
    {
      id: 1,
      name: '유기농 방울토마토',
      price: 8500,
      image: '/fresh-organic-cherry-tomatoes.jpg',
      rating: 4.8,
    },
    {
      id: 2,
      name: '무농약 상추',
      price: 5000,
      image: '/fresh-organic-lettuce.png',
      rating: 4.9,
    },
  ]

  const addresses = [
    {
      id: 1,
      name: '집',
      recipient: '김**',
      phone: '010-1234-5678',
      address: '서울시 강남구 테헤란로 123',
      addressDetail: '101동 101호',
      zipCode: '06142',
      isDefault: true,
    },
    {
      id: 2,
      name: '회사',
      recipient: '김**',
      phone: '010-1234-5678',
      address: '서울시 서초구 서초대로 456',
      addressDetail: '2층',
      zipCode: '06511',
      isDefault: false,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '배송 완료':
        return <Badge variant="secondary">배송 완료</Badge>
      case '배송 중':
        return <Badge variant="default">배송 중</Badge>
      case '배송 준비':
        return <Badge variant="outline">배송 준비</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">마이페이지</h1>
          <p className="text-muted-foreground">내 정보와 주문 내역을 관리하세요</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="orders">주문 내역</TabsTrigger>
            <TabsTrigger value="favorites">찜한 상품</TabsTrigger>
            <TabsTrigger value="settings">설정</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Profile Card */}
            <Card className="p-6">
              <div className="flex items-start gap-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={user.avatar || '/placeholder.svg'}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>가입일: {user.joinDate}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      수정
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.label} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </Card>
                )
              })}
            </div>

            {/* Recent Orders */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">최근 주문</h2>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab('orders')}>
                  전체보기
                </Button>
              </div>
              <div className="space-y-4">
                {recentOrders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/order/${order.id}`)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold">{order.id}</span>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {order.items.join(', ')}
                      </div>
                      <div className="text-sm text-muted-foreground">{order.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{order.total.toLocaleString()}원</div>
                      <Button variant="ghost" size="sm" className="mt-2">
                        상세보기
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">주문 내역</h2>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/order/${order.id}`)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold">주문번호: {order.id}</span>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {order.items.join(', ')}
                      </div>
                      <div className="text-sm text-muted-foreground">{order.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg mb-2">
                        {order.total.toLocaleString()}원
                      </div>
                      <Button variant="outline" size="sm">
                        상세보기
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">찜한 상품</h2>
              {favoriteProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">찜한 상품이 없습니다</p>
                  <Button asChild>
                    <Link href="/products">상품 둘러보기</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {favoriteProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="overflow-hidden group hover:shadow-lg transition-shadow"
                    >
                      <Link href={`/products/${product.id}`}>
                        <div className="relative aspect-square overflow-hidden bg-muted">
                          <Image
                            src={product.image || '/placeholder.svg'}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">{product.name}</h3>
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="text-sm font-medium">{product.rating}</span>
                          </div>
                          <div className="text-lg font-bold">
                            {product.price.toLocaleString()}원
                          </div>
                        </div>
                      </Link>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            {/* Profile Settings */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">프로필 정보</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">이름</Label>
                  <Input id="name" defaultValue={user.name} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">이메일</Label>
                  <Input id="email" type="email" defaultValue={user.email} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">전화번호</Label>
                  <Input id="phone" defaultValue={user.phone} className="mt-1" />
                </div>
                <Button>저장</Button>
              </div>
            </Card>

            {/* Delivery Addresses */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">배송지 관리</h2>
                <Button variant="outline" size="sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  배송지 추가
                </Button>
              </div>
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="p-4 border rounded-lg flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{address.name}</span>
                        {address.isDefault && (
                          <Badge variant="secondary" className="text-xs">
                            기본 배송지
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>
                          {address.recipient} ({address.phone})
                        </div>
                        <div>
                          [{address.zipCode}] {address.address} {address.addressDetail}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        수정
                      </Button>
                      <Button variant="destructive" size="sm">
                        삭제
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Payment Methods */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">결제 수단</h2>
                <Button variant="outline" size="sm">
                  <CreditCard className="h-4 w-4 mr-2" />
                  결제 수단 추가
                </Button>
              </div>
              <div className="text-center py-8 text-muted-foreground">
                등록된 결제 수단이 없습니다
              </div>
            </Card>

            {/* Account Actions */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">계정 관리</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  비밀번호 변경
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  <LogOut className="h-4 w-4 mr-2" />
                  로그아웃
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

