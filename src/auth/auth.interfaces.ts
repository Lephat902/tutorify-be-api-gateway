import { UserRole } from "@tutorify/shared"

export interface IAccessToken {
  readonly email: string
  readonly exp: number
  readonly iat: number
  readonly id: string
  readonly iss: number
  readonly type: TokenType
  readonly roles: UserRole[]
}

export enum TokenType {
  CLIENT,
  SYSTEM,
}