'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Sprout, ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Settings, LogOut } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { FarmerNav } from '../../components/farmer-nav'
import { productService } from '@/lib/api/services/product'
import { categoryService } from '@/lib/api/services/category'
import { authService } from '@/lib/api/services/auth'
import { getUserRole } from '@/lib/api/client'
import { useToast } from '@/hooks/use-toast'
import type { ProductStatus } from '@/lib/api/types'
import type { CategoryListItem } from '@/lib/api/types/category'
import { ImageIcon, X } from 'lucide-react'

const STATUS_OPTIONS: { value: ProductStatus; label: string }[] = [
  { value: 'ON_SALE', label: '판매중' },
  { value: 'DISCOUNTED', label: '할인중' },
  { value: 'SOLD_OUT', label: '품절' },
  { value: 'HIDDEN', label: '숨김' },
]

export default function NewProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    categoryId: '',
    price: '',
    productStatus: 'ON_SALE' as ProductStatus,
  })
  const [inventoryOptions, setInventoryOptions] = useState<
    Array<{ quantity: string; unit: string }>
  >([{ quantity: '', unit: '' }])
  const [images, setImages] = useState<File[]>([])
  const [categoryLevels, setCategoryLevels] = useState<CategoryListItem[][]>([])
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(false)
  const [loadingCategoryLevel, setLoadingCategoryLevel] = useState<number | null>(null)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  // 마운트 확인 및 userRole 확인
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const fetchCategories = async () => {
      setIsLoadingCategories(true)
      try {
        const data = await categoryService.getCategories()
        setCategoryLevels(data.length > 0 ? [data] : [])
        setSelectedCategoryIds([])
        setFormData((prev) => ({ ...prev, categoryId: '' }))
      } catch (error) {
        console.error('\uCE74\uD14C\uACE0\uB9AC \uC870\uD68C \uC2E4\uD328:', error)
        toast({
          title: '카테고리 조회 실패',
          description: '카테고리 목록을 불러오지 못했습니다.',
          variant: 'destructive',
        })
      } finally {
        setIsLoadingCategories(false)
      }
    }

    fetchCategories()
  }, [mounted, toast])

  const handleCategoryChange = async (levelIndex: number, value: string) => {
    const nextSelected = selectedCategoryIds.slice(0, levelIndex)
    nextSelected[levelIndex] = value
    setSelectedCategoryIds(nextSelected)
    setFormData((prev) => ({ ...prev, categoryId: value }))

    setCategoryLevels((prev) => prev.slice(0, levelIndex + 1))

    if (!value) return

    const nextLevelIndex = levelIndex + 1
    setLoadingCategoryLevel(nextLevelIndex)
    try {
      const children = await categoryService.getCategories(value)
      if (children.length > 0) {
        setCategoryLevels((prev) => [...prev, children])
      }
    } catch (error: unknown) {
      const apiError = error as { status?: number }
      if (apiError?.status !== 404) {
        console.error('하위 카테고리 조회 실패:', error)
        toast({
          title: '카테고리 조회 실패',
          description: '하위 카테고리를 불러오지 못했습니다.',
          variant: 'destructive',
        })
      }
    } finally {
      setLoadingCategoryLevel(null)
    }
  }

  // userRole이 없으면 auth/me를 호출해서 가져오기
  useEffect(() => {
    const ensureUserRole = async () => {
      if (!mounted) return

      // localStorage에 role이 없으면 auth/me 호출
      const currentRole = getUserRole()
      if (!currentRole) {
        try {
          await authService.getCurrentUser()
          // getCurrentUser 내부에서 setUserRole이 호출됨
        } catch (error) {
          console.error('사용자 정보 조회 실패:', error)
          // 에러가 발생해도 계속 진행 (API 호출 시 헤더가 없으면 서버에서 처리)
        }
      }
    }

    ensureUserRole()
  }, [mounted])

  useEffect(() => {
    if (images.length === 0) {
      setImagePreviews([])
      return
    }

    const previewUrls = images.map((image) => URL.createObjectURL(image))
    setImagePreviews(previewUrls)

    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [images])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 유효성 검사
    if (!formData.productName.trim()) {
      toast({
        title: '입력 오류',
        description: '상품명을 입력해주세요.',
        variant: 'destructive',
      })
      return
    }

    if (!formData.categoryId.trim()) {
      toast({
        title: '입력 오류',
        description: '카테고리를 선택해주세요.',
        variant: 'destructive',
      })
      return
    }

    const price = Number(formData.price)
    if (isNaN(price) || price <= 0) {
      toast({
        title: '입력 오류',
        description: '올바른 가격을 입력해주세요.',
        variant: 'destructive',
      })
      return
    }

    if (inventoryOptions.length === 0) {
      toast({
        title: '입력 오류',
        description: '재고 옵션을 최소 1개 이상 입력해주세요.',
        variant: 'destructive',
      })
      return
    }

    const parsedOptions = inventoryOptions.map((option) => ({
      quantity: Number(option.quantity),
      unit: Number(option.unit),
    }))

    const hasInvalidOption = parsedOptions.some(
      (option) =>
        isNaN(option.quantity) || option.quantity < 0 || isNaN(option.unit) || option.unit <= 0
    )

    if (hasInvalidOption) {
      toast({
        title: '입력 오류',
        description: '재고 옵션의 수량과 단위를 올바르게 입력해주세요.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    try {
      await productService.createProduct(
        {
          productName: formData.productName.trim(),
          description: formData.description.trim() || undefined,
          categoryId: formData.categoryId.trim(),
          price,
          productStatus: formData.productStatus,
          inventoryOptions: parsedOptions,
        },
        images.length > 0 ? images : undefined
      )

      toast({
        title: '상품 등록 완료',
        description: '새로운 상품이 등록되었습니다.',
      })

      // 상품 목록 페이지로 이동
      router.push('/farmer/products')
    } catch (error: unknown) {
      console.error('상품 등록 실패:', error)
      const errorMessage =
        error instanceof Error ? error.message : '상품 등록 중 오류가 발생했습니다.'
      toast({
        title: '상품 등록 실패',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Sprout className="h-6 w-6 text-primary" />
            <span className="font-semibold">BaroFarm</span>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="outline">판매자</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>F</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>햇살농장</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/farmer/dashboard">대시보드</Link>
                </DropdownMenuItem>
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
        <FarmerNav />

        {/* Page Header */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/farmer/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              상품 목록으로
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mb-2">새 상품 등록</h1>
          <p className="text-muted-foreground">판매할 상품의 정보를 입력해주세요</p>
        </div>

        {/* Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 상품명 */}
            <div className="space-y-2">
              <Label htmlFor="productName">
                상품명 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="productName"
                placeholder="예: 유기농 사과 5kg"
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                required
              />
            </div>

            {/* 설명 */}
            <div className="space-y-2">
              <Label htmlFor="description">상품 설명</Label>
              <Textarea
                id="description"
                placeholder="상품에 대한 상세 설명을 입력해주세요"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>
                {'\uCE74\uD14C\uACE0\uB9AC'} <span className="text-destructive">*</span>
              </Label>
              {isLoadingCategories && categoryLevels.length === 0 ? (
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue placeholder={'\uB85C\uB529 \uC911...'} />
                  </SelectTrigger>
                </Select>
              ) : categoryLevels.length === 0 ? (
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={'\uCE74\uD14C\uACE0\uB9AC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4'}
                    />
                  </SelectTrigger>
                </Select>
              ) : (
                <div className="space-y-3">
                  {categoryLevels.map((levelCategories, levelIndex) => (
                    <Select
                      key={`category-level-${levelIndex}`}
                      value={selectedCategoryIds[levelIndex] || ''}
                      onValueChange={(value) => handleCategoryChange(levelIndex, value)}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={`${levelIndex + 1}\uCC28 \uCE74\uD14C\uACE0\uB9AC \uC120\uD0DD`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {loadingCategoryLevel === levelIndex ? (
                          <SelectItem value="loading" disabled>
                            {'\uB85C\uB529 \uC911...'}
                          </SelectItem>
                        ) : levelCategories.length === 0 ? (
                          <SelectItem value="empty" disabled>
                            {'\uCE74\uD14C\uACE0\uB9AC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4'}
                          </SelectItem>
                        ) : (
                          levelCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name || category.code || category.id}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  ))}
                </div>
              )}
            </div>

            {/* 가격 */}
            <div className="space-y-2">
              <Label htmlFor="price">
                가격 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="예: 25000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                min="0"
                step="100"
                required
              />
            </div>

            {/* 재고 옵션 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>
                  재고 옵션 <span className="text-destructive">*</span>
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setInventoryOptions((prev) => [...prev, { quantity: '', unit: '' }])
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  옵션 추가
                </Button>
              </div>
              <div className="space-y-3">
                {inventoryOptions.map((option, index) => (
                  <div key={`option-${index}`} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Input
                      type="number"
                      placeholder="재고 수량 (예: 100)"
                      value={option.quantity}
                      onChange={(e) =>
                        setInventoryOptions((prev) =>
                          prev.map((item, idx) =>
                            idx === index ? { ...item, quantity: e.target.value } : item
                          )
                        )
                      }
                      min="0"
                      step="1"
                      required
                    />
                    <Input
                      type="number"
                      placeholder="단위 (예: 1)"
                      value={option.unit}
                      onChange={(e) =>
                        setInventoryOptions((prev) =>
                          prev.map((item, idx) =>
                            idx === index ? { ...item, unit: e.target.value } : item
                          )
                        )
                      }
                      min="1"
                      step="1"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setInventoryOptions((prev) => prev.filter((_, idx) => idx !== index))
                      }
                      disabled={inventoryOptions.length === 1}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      제거
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* 판매 상태 */}
            <div className="space-y-2">
              <Label htmlFor="status">판매 상태</Label>
              <Select
                value={formData.productStatus}
                onValueChange={(value) =>
                  setFormData({ ...formData, productStatus: value as ProductStatus })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 이미지 업로드 */}
            <div className="space-y-2">
              <Label>상품 이미지 (선택사항, 최대 10개)</Label>
              <div className="space-y-4">
                {/* 이미지 미리보기 */}
                {images.length > 0 && (
                  <div className="grid grid-cols-4 gap-4">
                    {imagePreviews.map((url, index) => (
                      <div
                        key={`file-${index}`}
                        className="relative aspect-square rounded-lg overflow-hidden border"
                      >
                        <img
                          src={url}
                          alt={`미리보기 ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImages((prev) => prev.filter((_, i) => i !== index))
                          }}
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs hover:bg-destructive/90"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* 이미지 업로드 버튼 */}
                {images.length < 10 && (
                  <label className="block">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                      <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-1">
                        이미지를 클릭하거나 드래그하여 업로드
                      </p>
                      <p className="text-xs text-muted-foreground">
                        이미지는 자동으로 압축되어 WebP 형식으로 변환됩니다
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || [])
                        if (files.length + images.length > 10) {
                          toast({
                            title: '이미지 개수 초과',
                            description: '최대 10개의 이미지만 업로드할 수 있습니다.',
                            variant: 'destructive',
                          })
                          return
                        }
                        setImages((prev) => [...prev, ...files])
                      }}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t">
              <Button type="button" variant="outline" asChild>
                <Link href="/farmer/products">취소</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? '등록 중...' : '상품 등록'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
