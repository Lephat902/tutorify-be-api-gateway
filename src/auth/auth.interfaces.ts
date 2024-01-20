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

export enum UserRole {
  STUDENT = 'STUDENT',
  TUTOR = 'TUTOR',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}