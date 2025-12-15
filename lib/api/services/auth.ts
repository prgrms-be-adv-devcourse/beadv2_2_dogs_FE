import { authApi, setAccessToken } from '../client'
import type {
  LoginRequest,
  LoginResult,
  SignupRequest,
  SignUpResult,
  FarmerSignupRequest,
  MeResponse,
  TokenResult,
  SendCodeRequest,
  VerifyCodeRequest,
  RefreshTokenRequest,
  PasswordResetRequest,
  PasswordResetConfirmRequest,
  PasswordChangeRequest,
  LogoutRequest,
} from '../types'

export const authService = {
  // 일반 로그인
  async login(data: LoginRequest): Promise<LoginResult> {
    const response = await authApi.post<LoginResult>('/auth/login', data)
    setAccessToken(response.accessToken)
    return response
  },

  // 농가 로그인
  async farmerLogin(data: LoginRequest): Promise<LoginResult> {
    const response = await authApi.post<LoginResult>('/auth/login', data)
    setAccessToken(response.accessToken)
    return response
  },

  // 일반 회원가입
  async signup(data: SignupRequest): Promise<SignUpResult> {
    const response = await authApi.post<SignUpResult>('/auth/signup', data)
    setAccessToken(response.accessToken)
    return response
  },

  // 농가 회원가입
  async farmerSignup(data: FarmerSignupRequest): Promise<SignUpResult> {
    const response = await authApi.post<SignUpResult>('/auth/signup', data)
    setAccessToken(response.accessToken)
    return response
  },

  // 로그아웃
  async logout(data?: LogoutRequest): Promise<void> {
    await authApi.post('/auth/logout', data || {})
    setAccessToken(null)
  },

  // 토큰 갱신
  async refreshToken(refreshToken: string): Promise<TokenResult> {
    const response = await authApi.post<TokenResult>('/auth/refresh', {
      refreshToken,
    } as RefreshTokenRequest)
    setAccessToken(response.accessToken)
    return response
  },

  // 현재 사용자 정보 조회
  async getCurrentUser(): Promise<MeResponse> {
    return authApi.get<MeResponse>('/auth/me')
  },

  // 비밀번호 재설정 코드 발송
  async requestPasswordReset(email: string): Promise<void> {
    return authApi.post('/auth/password/reset/request', { email } as PasswordResetRequest)
  },

  // 비밀번호 재설정 완료
  async resetPassword(data: PasswordResetConfirmRequest): Promise<void> {
    return authApi.post('/auth/password/reset/confirm', data)
  },

  // 비밀번호 변경
  async changePassword(data: PasswordChangeRequest): Promise<void> {
    return authApi.post('/auth/password/change', data)
  },

  // 이메일 인증 코드 발송
  async requestEmailVerification(email: string): Promise<void> {
    return authApi.post('/auth/verification/email/send-code', { email } as SendCodeRequest)
  },

  // 이메일 인증코드 검증
  async verifyEmailCode(email: string, code: string): Promise<{ verified: boolean }> {
    return authApi.post('/auth/verification/email/verify-code', {
      email,
      code,
    } as VerifyCodeRequest)
  },

  // 판매자 권한 부여
  async grantSellerRole(userId: string): Promise<void> {
    return authApi.post<void>(`/auth/${userId}/grant-seller`)
  },
}
