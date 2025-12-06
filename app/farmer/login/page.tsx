'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sprout } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function FarmerLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement farmer login logic with backend API
    console.log('[v0] Farmer login attempt:', { email, password })
    // For now, redirect to farmer dashboard
    router.push('/farmer/dashboard')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Sprout className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">바로팜</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">농가 로그인</h1>
          <p className="text-muted-foreground">농가 회원 전용 로그인</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">비밀번호</Label>
                <Link
                  href="/farmer/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  비밀번호 찾기
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              로그인
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
              <span className="text-muted-foreground">농가 회원이 아니신가요? </span>
              <Link href="/farmer/signup" className="text-primary hover:underline font-medium">
                농가 등록하기
              </Link>
            </div>

            <div className="mt-4 text-center">
              <Link href="/login" className="text-sm text-primary hover:underline">
                일반 회원 로그인
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
