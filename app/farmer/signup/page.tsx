'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Sprout } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authService } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'

export default function FarmerSignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [formData, setFormData] = useState({
    // 개인 정보 (로그인된 사용자 정보로 자동 채움)
    name: '',
    email: '',
    phone: '',
    // 농장 정보
    farmName: '',
    farmAddress: '',
    farmDescription: '',
    // 사업자 정보 (필수)
    businessNumber: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // 로그인된 사용자 정보 로드
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        // 먼저 API로 사용자 정보 조회 시도
        const user = await authService.getCurrentUser()
        setFormData((prev) => ({
          ...prev,
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
        }))
      } catch (error) {
        // API 실패 시 더미 사용자 정보 확인 (개발 환경)
        if (typeof window !== 'undefined') {
          const dummyUserStr = localStorage.getItem('dummyUser')
          if (dummyUserStr) {
            try {
              const dummyUser = JSON.parse(dummyUserStr)
              setFormData((prev) => ({
                ...prev,
                name: dummyUser.name || '홍길동',
                email: dummyUser.email || 'user@example.com',
                phone: dummyUser.phone || '010-1234-5678',
              }))
              setIsLoadingUser(false)
              return
            } catch (parseError) {
              console.error('더미 사용자 정보 파싱 실패:', parseError)
            }
          }
        }

        // 더미 사용자 정보도 없으면 로그인 페이지로 리다이렉트
        toast({
          title: '로그인이 필요합니다',
          description: '농가 등록을 위해 먼저 로그인해주세요.',
          variant: 'destructive',
        })
        router.push('/login')
      } finally {
        setIsLoadingUser(false)
      }
    }

    loadUserInfo()
  }, [router, toast])

  // 사업자 등록번호 형식 검증 (XXX-XX-XXXXX)
  const validateBusinessNumber = (value: string): boolean => {
    // 하이픈 포함 형식: XXX-XX-XXXXX
    const businessNumberRegex = /^\d{3}-\d{2}-\d{5}$/
    return businessNumberRegex.test(value)
  }

  // 사업자 등록번호 자동 포맷팅
  const formatBusinessNumber = (value: string): string => {
    // 숫자만 추출
    const numbers = value.replace(/[^\d]/g, '')

    // 최대 10자리까지만
    const limited = numbers.slice(0, 10)

    // 하이픈 자동 추가
    if (limited.length <= 3) {
      return limited
    } else if (limited.length <= 5) {
      return `${limited.slice(0, 3)}-${limited.slice(3)}`
    } else {
      return `${limited.slice(0, 3)}-${limited.slice(3, 5)}-${limited.slice(5)}`
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // 사업자 등록번호는 자동 포맷팅
    if (name === 'businessNumber') {
      const formatted = formatBusinessNumber(value)
      setFormData({ ...formData, [name]: formatted })

      // 실시간 검증
      if (formatted.length === 12) {
        // XXX-XX-XXXXX = 12자리
        if (validateBusinessNumber(formatted)) {
          setErrors((prev) => {
            const next = { ...prev }
            delete next.businessNumber
            return next
          })
        } else {
          setErrors((prev) => ({
            ...prev,
            businessNumber: '올바른 사업자 등록번호 형식이 아닙니다 (예: 123-45-67890)',
          }))
        }
      } else if (formatted.length > 0) {
        setErrors((prev) => ({
          ...prev,
          businessNumber: '사업자 등록번호는 10자리 숫자여야 합니다',
        }))
      } else {
        setErrors((prev) => {
          const next = { ...prev }
          delete next.businessNumber
          return next
        })
      }
    } else {
      setFormData({ ...formData, [name]: value })
      // 다른 필드의 에러 제거
      if (errors[name]) {
        setErrors((prev) => {
          const next = { ...prev }
          delete next[name]
          return next
        })
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 필수 필드 검증
    const newErrors: Record<string, string> = {}

    if (!formData.farmName.trim()) {
      newErrors.farmName = '농장명을 입력해주세요'
    }

    if (!formData.farmAddress.trim()) {
      newErrors.farmAddress = '농장 주소를 입력해주세요'
    }

    if (!formData.farmDescription.trim()) {
      newErrors.farmDescription = '농장 소개를 입력해주세요'
    }

    // 사업자 등록번호 검증
    if (!formData.businessNumber.trim()) {
      newErrors.businessNumber = '사업자 등록번호를 입력해주세요'
    } else if (!validateBusinessNumber(formData.businessNumber)) {
      newErrors.businessNumber = '올바른 사업자 등록번호 형식이 아닙니다 (예: 123-45-67890)'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast({
        title: '입력 정보를 확인해주세요',
        description: '모든 필수 항목을 올바르게 입력해주세요.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      // TODO: Implement farmer signup logic with backend API
      console.log('[v0] Farmer signup attempt:', formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: '농가 등록 신청이 완료되었습니다',
        description: '검토 후 승인되면 알림을 드리겠습니다.',
      })

      router.push('/farmer/login')
    } catch (error) {
      toast({
        title: '농가 등록 실패',
        description: '다시 시도해주세요.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">사용자 정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Sprout className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">바로팜</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">농가 등록</h1>
          <p className="text-muted-foreground">신선한 농산물로 소비자와 만나보세요</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 개인 정보 섹션 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold border-b pb-2 flex-1">개인 정보</h2>
                <p className="text-sm text-muted-foreground">로그인된 정보가 자동으로 입력됩니다</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">대표자명</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={handleChange}
                    readOnly
                    className="bg-muted cursor-not-allowed"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">전화번호</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="010-1234-5678"
                    value={formData.phone}
                    onChange={handleChange}
                    readOnly
                    className="bg-muted cursor-not-allowed"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly
                  className="bg-muted cursor-not-allowed"
                  required
                />
              </div>
            </div>

            {/* 농장 정보 섹션 */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">농장 정보</h2>

              <div className="space-y-2">
                <Label htmlFor="farmName">농장명</Label>
                <Input
                  id="farmName"
                  name="farmName"
                  type="text"
                  placeholder="바로팜"
                  value={formData.farmName}
                  onChange={handleChange}
                  className={errors.farmName ? 'border-destructive' : ''}
                  required
                />
                {errors.farmName && <p className="text-xs text-destructive">{errors.farmName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmAddress">농장 주소</Label>
                <Input
                  id="farmAddress"
                  name="farmAddress"
                  type="text"
                  placeholder="경기도 양평군 ..."
                  value={formData.farmAddress}
                  onChange={handleChange}
                  className={errors.farmAddress ? 'border-destructive' : ''}
                  required
                />
                {errors.farmAddress && (
                  <p className="text-xs text-destructive">{errors.farmAddress}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmDescription">농장 소개</Label>
                <Textarea
                  id="farmDescription"
                  name="farmDescription"
                  placeholder="농장의 특징과 재배 방식을 소개해주세요"
                  value={formData.farmDescription}
                  onChange={handleChange}
                  rows={4}
                  className={errors.farmDescription ? 'border-destructive' : ''}
                  required
                />
                {errors.farmDescription && (
                  <p className="text-xs text-destructive">{errors.farmDescription}</p>
                )}
              </div>
            </div>

            {/* 사업자 정보 섹션 (필수) */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">사업자 정보</h2>

              <div className="space-y-2">
                <Label htmlFor="businessNumber">
                  사업자등록번호 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="businessNumber"
                  name="businessNumber"
                  type="text"
                  placeholder="123-45-67890"
                  value={formData.businessNumber}
                  onChange={handleChange}
                  maxLength={12}
                  className={errors.businessNumber ? 'border-destructive' : ''}
                  required
                />
                {errors.businessNumber && (
                  <p className="text-xs text-destructive">{errors.businessNumber}</p>
                )}
                {!errors.businessNumber && (
                  <p className="text-xs text-muted-foreground">
                    형식: XXX-XX-XXXXX (하이픈 포함 10자리 숫자)
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? '처리 중...' : '농가 등록 신청'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">또는</span>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">이미 농가 계정이 있으신가요? </span>
              <Link href="/farmer/login" className="text-primary hover:underline font-medium">
                로그인
              </Link>
            </div>

            <div className="mt-4 text-center">
              <Link href="/signup" className="text-sm text-primary hover:underline">
                일반 회원으로 가입
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
