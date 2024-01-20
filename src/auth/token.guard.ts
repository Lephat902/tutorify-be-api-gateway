import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { AuthService } from './auth.service'
import { TokenRequirementsHelper } from './token-requirements.decorator'

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService
  ) { }

  public async canActivate(context: ExecutionContext) {
    const tokenRequirements = this.reflector.get<TokenRequirementsHelper>(
      'tokenrequirements',
      context.getHandler()
    );

    // If the endpoint doesn't require any roles
    if (!tokenRequirements) {
      return true;
    }

    if (!this.isBearerTokenPresent(context)) {
      return false;
    }

    const token = this.extractBearerToken(context);

    try {
      const decodedToken = this.authService.validateAccessToken(token);

      if (
        tokenRequirements.tokenIsOfType(decodedToken.type) &&
        tokenRequirements.tokenHasAllUserRoles(decodedToken.roles)
      ) {
        // Assign the decoded token for later access
        this.assignTokenToRequest(context, decodedToken);
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  }

  private assignTokenToRequest(context: ExecutionContext, token: any): void {
    const req = context.switchToHttp().getRequest();
    req.token = token;
  }

  private isBearerTokenPresent(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    return (
      req.headers.authorization &&
      (req.headers.authorization as string).split(' ')[0] === 'Bearer'
    );
  }

  private extractBearerToken(context: ExecutionContext): string | null {
    const req = context.switchToHttp().getRequest();
    if (!req.headers.authorization) {
      return null;
    }

    const [bearer, token] = (req.headers.authorization as string).split(' ');

    return bearer === 'Bearer' ? token : null;
  }
}
