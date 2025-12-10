'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Sprout,
  MapPin,
  Phone,
  Mail,
  Image as ImageIcon,
  Save,
  Settings,
  LogOut,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useToast } from '@/hooks/use-toast'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function FarmManagementPage() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [farmData, setFarmData] = useState({
    name: '햇살농장',
    description:
      '신선하고 건강한 유기농 농산물을 재배하는 햇살농장입니다. 30년 이상의 농업 경험을 바탕으로 최고 품질의 농산물을 생산하고 있습니다.',
    address: '경기도 양평군 양평읍 농장길 123',
    phone: '031-1234-5678',
    email: 'sunny@farm.com',
    businessNumber: '123-45-67890',
    certifications: ['유기농 인증', '무농약 인증', 'GAP 인증'],
    operatingHours: '평일 09:00 - 18:00, 주말 09:00 - 17:00',
    parkingAvailable: true,
    facilities: ['주차장', '화장실', '휴게실', '판매장'],
  })

  const handleSave = () => {
    // TODO: API 연동
    toast({
      title: '농장 정보 저장 완료',
      description: '농장 정보가 업데이트되었습니다.',
    })
    setIsEditing(false)
  }

  const handleChange = (field: string, value: any) => {
    setFarmData({ ...farmData, [field]: value })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">바로팜</span>
            </Link>
            <Badge variant="secondary">농가</Badge>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">고객 페이지</Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarFallback>햇</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>햇살농장</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/farmer/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    설정
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="h-4 w-4 mr-2" />
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">농장 정보 관리</h1>
            <p className="text-muted-foreground">농장의 기본 정보를 관리하세요</p>
          </div>
          <div className="flex gap-3">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>편집하기</Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  취소
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  저장하기
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">기본 정보</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="farmName">농장명</Label>
                  <Input
                    id="farmName"
                    value={farmData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">농장 소개</Label>
                  <Textarea
                    id="description"
                    value={farmData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">주소</Label>
                  <div className="flex gap-2">
                    <Input
                      id="address"
                      value={farmData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      disabled={!isEditing}
                    />
                    {isEditing && (
                      <Button variant="outline" type="button">
                        주소 검색
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">연락처 정보</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">전화번호</Label>
                  <Input
                    id="phone"
                    value={farmData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    value={farmData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">사업자 정보</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessNumber">사업자 등록번호</Label>
                  <Input
                    id="businessNumber"
                    value={farmData.businessNumber}
                    onChange={(e) => handleChange('businessNumber', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label>인증서</Label>
                  <div className="flex flex-wrap gap-2">
                    {farmData.certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary">
                        {cert}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        인증서 추가
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">운영 정보</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="operatingHours">운영 시간</Label>
                  <Input
                    id="operatingHours"
                    value={farmData.operatingHours}
                    onChange={(e) => handleChange('operatingHours', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label>편의시설</Label>
                  <div className="flex flex-wrap gap-2">
                    {farmData.facilities.map((facility, index) => (
                      <Badge key={index} variant="outline">
                        {facility}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        시설 추가
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">농장 이미지</h2>
              <div className="space-y-4">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <Image
                    src="/sunny-farm-with-greenhouse.jpg"
                    alt="농장 메인 이미지"
                    fill
                    className="object-cover"
                  />
                </div>
                {isEditing && (
                  <Button variant="outline" className="w-full">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    이미지 변경
                  </Button>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">통계</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">등록 상품</span>
                  <span className="font-semibold">12개</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">등록 체험</span>
                  <span className="font-semibold">3개</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">평균 평점</span>
                  <span className="font-semibold">4.8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">리뷰 수</span>
                  <span className="font-semibold">124건</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">빠른 메뉴</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/farmer/dashboard">대시보드</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/farmer/products">상품 관리</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/farmer/experiences">체험 관리</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/farmer/bookings">예약 관리</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/farmer/orders">주문 관리</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
