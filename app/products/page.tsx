'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Star, Filter, X, Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { SearchBox } from '@/components/search'
import { Header } from '@/components/layout/header'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')

  const products = [
    {
      id: 1,
      name: '유기농 방울토마토',
      farm: '햇살농장',
      location: '충남 당진',
      price: 8500,
      originalPrice: 12000,
      image: '/fresh-organic-cherry-tomatoes.jpg',
      rating: 4.8,
      reviews: 124,
      tag: '베스트',
      category: '채소',
    },
    {
      id: 2,
      name: '무농약 상추',
      farm: '초록들판',
      location: '경기 양평',
      price: 5000,
      originalPrice: 7000,
      image: '/fresh-organic-lettuce.png',
      rating: 4.9,
      reviews: 89,
      tag: '신선',
      category: '채소',
    },
    {
      id: 3,
      name: '친환경 딸기',
      farm: '달콤농원',
      location: '전북 완주',
      price: 15000,
      originalPrice: 18000,
      image: '/images/strawberries.png',
      rating: 5.0,
      reviews: 203,
      tag: '인기',
      category: '과일',
    },
    {
      id: 4,
      name: '유기농 감자',
      farm: '푸른밭농장',
      location: '강원 평창',
      price: 12000,
      originalPrice: 15000,
      image: '/fresh-organic-potatoes.jpg',
      rating: 4.7,
      reviews: 67,
      tag: '할인',
      category: '채소',
    },
    {
      id: 5,
      name: '무농약 사과',
      farm: '사과마을',
      location: '경북 청송',
      price: 18000,
      originalPrice: 22000,
      image: '/images/apples.png',
      rating: 4.9,
      reviews: 156,
      tag: '베스트',
      category: '과일',
    },
    {
      id: 6,
      name: '유기농 당근',
      farm: '건강농장',
      location: '제주',
      price: 6500,
      originalPrice: 8500,
      image: '/fresh-organic-carrots.jpg',
      rating: 4.6,
      reviews: 92,
      tag: '신선',
      category: '채소',
    },
    {
      id: 7,
      name: '친환경 블루베리',
      farm: '베리팜',
      location: '전남 고흥',
      price: 12000,
      originalPrice: 15000,
      image: '/fresh-organic-blueberries.jpg',
      rating: 4.8,
      reviews: 134,
      tag: '인기',
      category: '과일',
    },
    {
      id: 8,
      name: '무농약 브로콜리',
      farm: '그린농원',
      location: '충북 충주',
      price: 7000,
      originalPrice: 9000,
      image: '/fresh-organic-broccoli.jpg',
      rating: 4.7,
      reviews: 78,
      tag: '할인',
      category: '채소',
    },
  ]

  // 필터링 및 정렬 로직
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products]

    // 검색 필터
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.farm.toLowerCase().includes(query) ||
          product.location.toLowerCase().includes(query)
      )
    }

    // 카테고리 필터
    if (category !== 'all') {
      filtered = filtered.filter((product) => product.category === category)
    }

    // 정렬
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
      case 'latest':
        filtered.sort((a, b) => b.id - a.id)
        break
      case 'low-price':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'high-price':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return filtered
  }, [searchQuery, category, sortBy])

  const hasActiveFilters = searchQuery.trim() || category !== 'all'

  const clearFilters = () => {
    setSearchQuery('')
    setCategory('all')
    setSortBy('popular')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header showCart />

      {/* Page Header */}
      <section className="py-12 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">농산물 장터</h1>
          <p className="text-muted-foreground">신선한 농산물을 농장에서 직접 배송받으세요</p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-6 border-b bg-background sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchBox
                initialQuery={searchQuery}
                onSearch={(query) => setSearchQuery(query)}
                searchType="product"
                placeholder="농산물, 농장 이름으로 검색..."
                enableSuggestions={true}
                enablePopularKeywords={true}
                debounceDelay={300}
              />
            </div>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="채소">채소</SelectItem>
                <SelectItem value="과일">과일</SelectItem>
                <SelectItem value="곡물">곡물</SelectItem>
                <SelectItem value="기타">기타</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="정렬" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">인기순</SelectItem>
                <SelectItem value="latest">최신순</SelectItem>
                <SelectItem value="low-price">낮은 가격순</SelectItem>
                <SelectItem value="high-price">높은 가격순</SelectItem>
                <SelectItem value="rating">평점순</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="md:w-auto bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              필터
            </Button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              총{' '}
              <span className="font-semibold text-foreground">
                {filteredAndSortedProducts.length}
              </span>
              개의 상품
              {hasActiveFilters && (
                <span className="ml-2 text-xs">(전체 {products.length}개 중)</span>
              )}
            </p>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                필터 초기화
              </Button>
            )}
          </div>

          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">검색 결과가 없습니다</h3>
              <p className="text-muted-foreground mb-4">다른 검색어나 필터를 시도해보세요</p>
              <Button variant="outline" onClick={clearFilters}>
                필터 초기화
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredAndSortedProducts.map((product) => (
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
                      <Badge className="absolute top-3 left-3">{product.tag}</Badge>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3" />
                        <span>{product.farm}</span>
                        <span className="mx-1">•</span>
                        <span>{product.location}</span>
                      </div>
                      <h3 className="font-semibold mb-2">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">
                          {product.price.toLocaleString()}원
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          {product.originalPrice.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
