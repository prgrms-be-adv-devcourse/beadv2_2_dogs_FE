import { uploadService } from './api/services/upload'

/**
 * 단일 파일 업로드 (백엔드 API 사용)
 * @param file - 업로드할 파일
 * @param type - 파일 타입 (experience, farm, product, profile 등)
 * @returns 업로드된 파일 정보 (URL 포함)
 */
export async function uploadFile(
  file: File,
  type?: string
): Promise<{
  success: boolean
  fileName: string
  url: string
  size: number
  type: string
}> {
  return uploadService.uploadFile(file, type)
}

/**
 * 여러 파일 업로드 (백엔드 API 사용)
 * @param files - 업로드할 파일 배열
 * @param type - 파일 타입
 * @returns 업로드된 파일 정보 배열
 */
export async function uploadMultipleFiles(
  files: File[],
  type?: string
): Promise<{
  success: boolean
  files: Array<{
    fileName: string
    url: string
    size: number
    type: string
  }>
  count: number
}> {
  return uploadService.uploadMultipleFiles(files, type)
}

/**
 * 파일 크기를 읽기 쉬운 형식으로 변환
 * @param bytes - 바이트 단위 파일 크기
 * @returns 포맷된 파일 크기 문자열
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

/**
 * 파일이 이미지인지 확인
 * @param file - 확인할 파일
 * @returns 이미지 여부
 */
export function isImageFile(file: File): boolean {
  const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  return imageTypes.includes(file.type)
}

/**
 * 이미지 미리보기 URL 생성
 * @param file - 이미지 파일
 * @returns 미리보기 URL (ObjectURL)
 */
export function createImagePreview(file: File): string {
  return URL.createObjectURL(file)
}

/**
 * 이미지 미리보기 URL 해제
 * @param url - 해제할 ObjectURL
 */
export function revokeImagePreview(url: string): void {
  URL.revokeObjectURL(url)
}
