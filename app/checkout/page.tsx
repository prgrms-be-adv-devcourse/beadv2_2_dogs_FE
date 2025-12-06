'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CreditCard, Truck } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/header'
import { useCartStore } from '@/lib/cart-store'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    addressDetail: '',
    zipCode: '',
    deliveryNote: '',
    paymentMethod: 'card',
  })

  const deliveryFee = items.length > 0 ? 3000 : 0
  const totalPrice = getTotalPrice()
  const finalPrice = totalPrice + deliveryFee

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (items.length === 0) {
      toast({
        title: '장바구니가 비어있습니다',
        description: '상품을 장바구니에 담아주세요.',
        variant: 'destructive',
      })
      router.push('/cart')
      return
    }

    setIsProcessing(true)

    try {
      // TODO: Implement actual order processing with backend API
      console.log('[v0] Processing order:', {
        items,
        formData,
        totalPrice: finalPrice,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      clearCart()
      
      toast({
        title: '주문이 완료되었습니다',
        description: `총 ${finalPrice.toLocaleString()}원이 결제되었습니다.`,
      })

      router.push('/order/success')
    } catch (error) {
      toast({
        title: '주문 실패',
        description: '주문 처리 중 오류가 발생했습니다. 다시 시도해주세요.',
        variant: 'destructive',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">주문/결제</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Info */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Truck className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">배송 정보</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">받는 분 이름</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">휴대폰 번호</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="010-1234-5678"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="md:col-span-1 space-y-2">
                      <Label htmlFor="zipCode">우편번호</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        required
                      />
                    </div>
                    <div className="md:col-span-3 flex items-end">
                      <Button type="button" variant="outline">
                        주소 검색
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">주소</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="addressDetail">상세 주소</Label>
                    <Input
                      id="addressDetail"
                      value={formData.addressDetail}
                      onChange={(e) => handleInputChange('addressDetail', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryNote">배송 메모 (선택)</Label>
                    <Input
                      id="deliveryNote"
                      placeholder="배송 시 요청사항을 입력해주세요"
                      value={formData.deliveryNote}
                      onChange={(e) => handleInputChange('deliveryNote', e.target.value)}
                    />
                  </div>
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">결제 수단</h2>
                </div>

                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange('paymentMethod', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">신용/체크카드</SelectItem>
                    <SelectItem value="transfer">계좌이체</SelectItem>
                    <SelectItem value="phone">휴대폰 결제</SelectItem>
                    <SelectItem value="kakao">카카오페이</SelectItem>
                    <SelectItem value="naver">네이버페이</SelectItem>
                  </SelectContent>
                </Select>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">주문 상품</h2>

                <div className="space-y-3 mb-4 pb-4 border-b max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.farm}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground">{item.quantity}개</span>
                          <span className="text-sm font-semibold">
                            {(item.price * item.quantity).toLocaleString()}원
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-4 pb-4 border-b">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">상품 금액</span>
                    <span>{totalPrice.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">배송비</span>
                    <span>{deliveryFee.toLocaleString()}원</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>총 결제 금액</span>
                  <span className="text-primary">{finalPrice.toLocaleString()}원</span>
                </div>

                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? '처리 중...' : `${finalPrice.toLocaleString()}원 결제하기`}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  주문 완료 시 개인정보 처리방침 및 이용약관에 동의한 것으로 간주합니다.
                </p>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
