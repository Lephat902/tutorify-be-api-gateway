import { SetMetadata } from '@nestjs/common';
import { TokenType, UserRole } from './auth.interfaces';

export const TokenRequirements = (requiredTokenType: TokenType, requiredUserRoles: UserRole[]) =>
  SetMetadata('tokenrequirements', new TokenRequirementsHelper(requiredTokenType, requiredUserRoles));

export class TokenRequirementsHelper {

  private requiredTokenType: TokenType;
  private requiredUserRoles: UserRole[];

  constructor(requiredTokenType: TokenType, requiredUserRoles: UserRole[]) {
    this.requiredTokenType = requiredTokenType;
    this.requiredUserRoles = requiredUserRoles;
  }

  public tokenIsOfType(tokenType: TokenType): boolean {
    return tokenType === this.requiredTokenType;
  }

  public tokenHasAllUserRoles(userRoles: UserRole[]): boolean {
    return this.requiredUserRoles.every(requiredRole => userRoles.indexOf(requiredRole) > -1) || this.requiredUserRoles.length === 0;
  }
}