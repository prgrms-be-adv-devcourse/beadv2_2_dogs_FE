'use client'

import { highlightKeyword } from '@/lib/utils/search'

interface HighlightTextProps {
  text: string
  keyword: string
  className?: string
}

/**
 * 검색어를 하이라이트하는 컴포넌트
 */
export function HighlightText({ text, keyword, className }: HighlightTextProps) {
  if (!keyword.trim()) {
    return <span className={className}>{text}</span>
  }

  const highlighted = highlightKeyword(text, keyword)

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  )
}

