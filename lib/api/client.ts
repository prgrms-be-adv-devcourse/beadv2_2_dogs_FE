import { API_URLS, ServiceName } from './config'

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface ApiError {
  status: number
  message: string
  code?: string
  details?: string
  error?: string
  path?: string
  timestamp?: string
}

// Request Options
interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>
}

// Token Management
let accessToken: string | null = null

export const setAccessToken = (token: string | null) => {
  accessToken = token
  if (token) {
    localStorage.setItem('accessToken', token)
  } else {
    localStorage.removeItem('accessToken')
  }
}

export const getAccessToken = (): string | null => {
  if (accessToken) return accessToken
  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('accessToken')
  }
  return accessToken
}

// JWT 토큰에서 userId 추출
export const getUserIdFromToken = (): string | null => {
  const token = getAccessToken()
  if (!token) return null

  try {
    // JWT는 base64로 인코딩된 3부분으로 구성: header.payload.signature
    const parts = token.split('.')
    if (parts.length !== 3) return null

    // payload 디코딩
    const payload = JSON.parse(atob(parts[1]))
    return payload.uid || payload.userId || null
  } catch (error) {
    console.error('Failed to decode token:', error)
    return null
  }
}

// API Client Class
class ApiClient {
  private baseUrl: string

  constructor(service: ServiceName) {
    this.baseUrl = API_URLS[service]
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, ...fetchOptions } = options

    // Build URL with query params
    let url = `${this.baseUrl}${endpoint}`
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value))
        }
      })
      const queryString = searchParams.toString()
      if (queryString) {
        url += `?${queryString}`
      }
    }

    // Default headers
    // const headers: HeadersInit = {
    //   'Content-Type': 'application/json',
    //   ...fetchOptions.headers,
    // }
    // Default headers

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers instanceof Headers
        ? Object.fromEntries(fetchOptions.headers.entries())
        : Array.isArray(fetchOptions.headers)
          ? Object.fromEntries(fetchOptions.headers)
          : (fetchOptions.headers ?? {})),
    }

    // Add auth token if available
    const token = getAccessToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`

      // JWT 토큰에서 userId 추출하여 X-User-Id 헤더 추가
      const userId = getUserIdFromToken()
      if (userId) {
        headers['X-User-Id'] = userId
      }
    }

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
      })

      // Handle non-OK responses
      if (!response.ok) {
        let errorData: Record<string, unknown> = {}
        try {
          const text = await response.text()
          if (text) {
            errorData = JSON.parse(text) as Record<string, unknown>
          }
        } catch {
          // JSON 파싱 실패 시 빈 객체 사용
        }

        // 404 응답의 경우, 일부 API는 정상 응답일 수 있음 (예: 예치금 계정 없음)
        // 하지만 일반적으로는 에러로 처리
        if (response.status === 404) {
          // ResponseDto 형식의 404 응답인 경우 (status 필드가 있음)
          if (errorData.status === 404 && errorData.message) {
            // 예치금 계정이 없는 경우 등 정상적인 404 응답
            throw {
              status: response.status,
              message: errorData.message as string,
              code: 'NOT_FOUND',
              details: errorData.message as string,
              error: errorData.error,
              path: errorData.path || url,
              timestamp: errorData.timestamp,
            } as ApiError
          }
        }

        // 에러 메시지 추출 (다양한 형식 지원)
        const errorMessage =
          errorData.message ||
          errorData.error ||
          errorData.details ||
          errorData.errorMessage ||
          response.statusText ||
          '알 수 없는 오류가 발생했습니다.'

        // HTTP 상태 코드별 기본 메시지
        let statusMessage = ''
        switch (response.status) {
          case 400:
            statusMessage = '잘못된 요청입니다.'
            break
          case 401:
            statusMessage = '인증이 필요합니다. 로그인해주세요.'
            break
          case 403:
            statusMessage = '접근 권한이 없습니다.'
            break
          case 404:
            statusMessage = '요청한 리소스를 찾을 수 없습니다.'
            break
          case 409:
            statusMessage = '이미 존재하는 데이터입니다.'
            break
          case 422:
            statusMessage = '입력 데이터가 올바르지 않습니다.'
            break
          case 500:
            statusMessage = '서버 오류가 발생했습니다.'
            break
          case 503:
            statusMessage = '서비스를 일시적으로 사용할 수 없습니다.'
            break
          default:
            statusMessage = `서버 오류 (${response.status})`
        }

        throw {
          status: response.status,
          message: errorMessage !== response.statusText ? errorMessage : statusMessage,
          code: errorData.code || errorData.error,
          details: errorData.details || errorData.message,
          error: errorData.error,
          path: errorData.path || url,
          timestamp: errorData.timestamp,
        } as ApiError
      }

      // Handle empty responses
      if (response.status === 204) {
        return {} as T
      }

      return response.json()
    } catch (error) {
      // 이미 ApiError인 경우 그대로 던지기
      if ((error as ApiError).status !== undefined) {
        throw error
      }

      // 네트워크 오류 처리
      const networkError = error as Error
      let errorMessage = '네트워크 오류가 발생했습니다.'

      if (networkError.message) {
        if (networkError.message.includes('Failed to fetch')) {
          errorMessage = '서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.'
        } else if (networkError.message.includes('NetworkError')) {
          errorMessage = '네트워크 연결이 끊어졌습니다.'
        } else if (networkError.message.includes('timeout')) {
          errorMessage = '요청 시간이 초과되었습니다. 다시 시도해주세요.'
        } else {
          errorMessage = `연결 오류: ${networkError.message}`
        }
      }

      throw {
        status: 0,
        message: errorMessage,
        code: 'NETWORK_ERROR',
        details: networkError.message,
      } as ApiError
    }
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  async post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

// Create API clients for each service
export const authApi = new ApiClient('AUTH')
export const buyerApi = new ApiClient('BUYER')
export const cartApi = new ApiClient('CART')
export const productApi = new ApiClient('PRODUCT')
export const sellerApi = new ApiClient('SELLER')
export const farmApi = new ApiClient('FARM')
export const orderApi = new ApiClient('ORDER')
export const paymentApi = new ApiClient('PAYMENT')
export const settlementApi = new ApiClient('SETTLEMENT')
export const deliveryApi = new ApiClient('DELIVERY')
export const notificationApi = new ApiClient('NOTIFICATION')
export const experienceApi = new ApiClient('EXPERIENCE')
export const searchApi = new ApiClient('SEARCH')
export const reviewApi = new ApiClient('REVIEW')
