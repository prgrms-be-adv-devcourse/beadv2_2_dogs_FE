'use client'

import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onFocus?: () => void
  onBlur?: () => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  className?: string
  showClearButton?: boolean
  autoFocus?: boolean
}

export function SearchInput({
  value,
  onChange,
  placeholder = '검색어를 입력하세요',
  onFocus,
  onBlur,
  onKeyDown,
  className,
  showClearButton = true,
  autoFocus = false,
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  const handleClear = () => {
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <div className={cn('relative flex-1', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          setIsFocused(true)
          onFocus?.()
        }}
        onBlur={() => {
          setIsFocused(false)
          onBlur?.()
        }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={cn('pl-10', showClearButton && value && 'pr-10')}
      />
      {showClearButton && value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="검색어 지우기"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

