'use client'

import { Card } from '@/components/ui/card'

interface ProductDescriptionSectionProps {
  imageUrls?: string[]
  positiveReviewSummary?: string[]
  negativeReviewSummary?: string[]
}

export function ProductDescriptionSection({
  imageUrls,
  positiveReviewSummary,
  negativeReviewSummary,
}: ProductDescriptionSectionProps) {
  const hasPositiveSummary =
    Array.isArray(positiveReviewSummary) && positiveReviewSummary.length > 0
  const hasNegativeSummary =
    Array.isArray(negativeReviewSummary) && negativeReviewSummary.length > 0

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">상품 설명</h2>
      {imageUrls && imageUrls.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">상세 이미지</h3>
          <div className="space-y-4">
            {imageUrls.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="relative w-full overflow-hidden rounded-lg border"
              >
                <img
                  src={url}
                  alt={`Detail ${index + 1}`}
                  className="w-full h-auto object-contain bg-muted"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">리뷰 요약</h3>
        <div className="space-y-4 text-sm">
          <div>
            <div className="font-medium mb-1">긍정 리뷰</div>
            {hasPositiveSummary ? (
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                {positiveReviewSummary!.map((item, index) => (
                  <li key={`pos-${index}`}>{item}</li>
                ))}
              </ul>
            ) : (
              <div className="text-muted-foreground">리뷰 요약 수집중입니다.</div>
            )}
          </div>
          <div>
            <div className="font-medium mb-1">부정 리뷰</div>
            {hasNegativeSummary ? (
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                {negativeReviewSummary!.map((item, index) => (
                  <li key={`neg-${index}`}>{item}</li>
                ))}
              </ul>
            ) : (
              <div className="text-muted-foreground">리뷰 요약 수집중입니다.</div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
