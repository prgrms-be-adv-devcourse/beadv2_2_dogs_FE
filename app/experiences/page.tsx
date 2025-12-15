'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { MapPin, Search, Filter, Users, Clock, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/header'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { experienceService } from '@/lib/api/services/experience'
import { useEffect } from 'react'
import type { Experience } from '@/lib/api/types'
import { ExperienceCard } from '@/components/product/experience-card'

export default function ExperiencesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 체험 프로그램 목록 로드
  useEffect(() => {
    const fetchExperiences = async () => {
      if (!mounted) return

      setIsLoading(true)
      try {
        const params: { category?: string; page?: number; size?: number } = {}
        if (category !== 'all') {
          params.category = category
        }
        const response = await experienceService.getExperiences(params)
        setExperiences(response.content)
      } catch (error) {
        console.error('체험 프로그램 조회 실패:', error)
        // 에러 발생 시 빈 배열로 설정
        setExperiences([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchExperiences()
  }, [mounted, category])

  // 임시 더미 데이터 (API 실패 시 대체용)
  const dummyExperiences = [
    {
      id: 1,
      title: '딸기 수확 체험',
      farm: '달콤농원',
      location: '전북 완주',
      price: 25000,
      image: '/strawberry-picking-farm-experience.jpg',
      duration: '2시간',
      capacity: '최대 10명',
      rating: 4.9,
      reviews: 87,
      category: '수확',
      tag: '인기',
    },
    {
      id: 2,
      title: '감자 캐기 체험',
      farm: '푸른밭농장',
      location: '강원 평창',
      price: 20000,
      image: '/potato-harvesting-farm-experience.jpg',
      duration: '3시간',
      capacity: '최대 15명',
      rating: 4.8,
      reviews: 64,
      category: '수확',
      tag: '베스트',
    },
    {
      id: 3,
      title: '토마토 수확 & 요리',
      farm: '햇살농장',
      location: '충남 당진',
      price: 35000,
      image: '/tomato-harvesting-cooking-farm-experience.jpg',
      duration: '4시간',
      capacity: '최대 8명',
      rating: 5.0,
      reviews: 92,
      category: '요리',
      tag: '인기',
    },
    {
      id: 4,
      title: '사과 따기 체험',
      farm: '사과마을',
      location: '경북 청송',
      price: 28000,
      image: '/apple-picking-experience.jpg',
      duration: '2.5시간',
      capacity: '최대 12명',
      rating: 4.7,
      reviews: 53,
      category: '수확',
      tag: '신규',
    },
    {
      id: 5,
      title: '블루베리 수확 & 잼 만들기',
      farm: '베리팜',
      location: '전남 고흥',
      price: 32000,
      image: '/blueberry-jam-making.jpg',
      duration: '3.5시간',
      capacity: '최대 10명',
      rating: 4.9,
      reviews: 78,
      category: '요리',
      tag: '인기',
    },
    {
      id: 6,
      title: '상추 수확 & 쌈밥 만들기',
      farm: '초록들판',
      location: '경기 양평',
      price: 22000,
      image: '/lettuce-harvest-korean-meal.jpg',
      duration: '2시간',
      capacity: '최대 15명',
      rating: 4.6,
      reviews: 41,
      category: '요리',
      tag: '베스트',
    },
  ]

  // API 데이터를 표시 형식으로 변환
  const displayExperiences =
    experiences.length > 0
      ? experiences.map((exp) => ({
          id: exp.id,
          title: exp.title,
          farm: exp.farmName || '',
          location: exp.farmLocation || '',
          price: exp.pricePerPerson || 0,
          image: exp.images?.[0] || '/placeholder.svg',
          duration: `${exp.duration || 2}시간`, // TODO: 실제 duration 형식에 맞게 변환
          capacity: `최대 ${exp.maxParticipants || 10}명`,
          rating: exp.rating || 0,
          reviews: exp.reviewCount || 0,
          category: exp.category || '기타',
          tag: '인기', // TODO: 태그 정보 추가
        }))
      : dummyExperiences

  // 필터링 및 정렬 로직
  const filteredAndSortedExperiences = useMemo(() => {
    let filtered = [...displayExperiences]

    // 검색 필터
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (exp) =>
          exp.title.toLowerCase().includes(query) ||
          exp.farm.toLowerCase().includes(query) ||
          exp.location.toLowerCase().includes(query)
      )
    }

    // 카테고리 필터
    if (category !== 'all') {
      filtered = filtered.filter((exp) => exp.category === category)
    }

    // 정렬
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
      case 'latest':
        filtered.sort((a, b) => String(b.id).localeCompare(String(a.id)))
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
  }, [searchQuery, category, sortBy, displayExperiences])

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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">농장 체험 프로그램</h1>
          <p className="text-muted-foreground">
            도시를 벗어나 자연과 함께하는 특별한 경험을 만들어보세요
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-6 border-b bg-background sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="체험 프로그램, 농장 이름으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="수확">수확 체험</SelectItem>
                <SelectItem value="요리">요리 체험</SelectItem>
                <SelectItem value="동물">동물 교감</SelectItem>
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

      {/* Experiences Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              총{' '}
              <span className="font-semibold text-foreground">
                {filteredAndSortedExperiences.length}
              </span>
              개의 체험 프로그램
              {hasActiveFilters && (
                <span className="ml-2 text-xs">(전체 {displayExperiences.length}개 중)</span>
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

          {filteredAndSortedExperiences.length === 0 ? (
            <div className="text-center py-16">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">검색 결과가 없습니다</h3>
              <p className="text-muted-foreground mb-4">다른 검색어나 필터를 시도해보세요</p>
              <Button variant="outline" onClick={clearFilters}>
                필터 초기화
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedExperiences.map((exp, index) => (
                <ExperienceCard
                  key={exp.id}
                  id={exp.id}
                  title={exp.title}
                  farm={exp.farm}
                  location={exp.location}
                  price={exp.price}
                  image={exp.image}
                  duration={exp.duration}
                  capacity={exp.capacity}
                  className={index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
