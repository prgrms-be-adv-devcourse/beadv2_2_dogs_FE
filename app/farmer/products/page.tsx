'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Sprout, Search, Plus, Edit, Trash2, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function FarmerProductsPage() {
  const products = [
    {
      id: 1,
      name: '유기농 방울토마토',
      price: 8500,
      originalPrice: 12000,
      stock: 50,
      status: '판매중',
      sales: 124,
      image: '/fresh-organic-cherry-tomatoes.jpg',
    },
    {
      id: 2,
      name: '무농약 상추',
      price: 5000,
      originalPrice: 7000,
      stock: 0,
      status: '품절',
      sales: 89,
      image: '/fresh-organic-lettuce.png',
    },
    {
      id: 3,
      name: '친환경 딸기',
      price: 15000,
      originalPrice: 18000,
      stock: 30,
      status: '판매중',
      sales: 203,
      image: '/images/strawberries.png',
    },
    {
      id: 4,
      name: '유기농 감자',
      price: 12000,
      originalPrice: 15000,
      stock: 80,
      status: '판매중',
      sales: 67,
      image: '/fresh-organic-potatoes.jpg',
    },
  ]

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">상품 관리</h1>
            <p className="text-muted-foreground">등록된 상품을 관리하고 재고를 업데이트하세요</p>
          </div>
          <Button asChild>
            <Link href="/farmer/products/new">
              <Plus className="h-4 w-4 mr-2" />
              상품 등록
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="상품 검색..." className="pl-10" />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative aspect-square bg-muted">
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <Badge
                  className="absolute top-3 right-3"
                  variant={product.status === '판매중' ? 'default' : 'secondary'}
                >
                  {product.status}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{product.price.toLocaleString()}원</span>
                    <span className="text-sm text-muted-foreground line-through">
                      {product.originalPrice.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      재고:{' '}
                      <span
                        className={
                          product.stock === 0
                            ? 'text-destructive font-medium'
                            : 'font-medium text-foreground'
                        }
                      >
                        {product.stock}개
                      </span>
                    </span>
                    <span>판매: {product.sales}건</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Edit className="h-4 w-4 mr-1" />
                    편집
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
