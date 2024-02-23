import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { AuthConstants } from './auth.constants';
import { IAccessToken, TokenType } from './auth.interfaces';
import { firstValueFrom } from 'rxjs';
import { LoginDto, SignUpDto } from './dtos';
import { QueueNames } from '@tutorify/shared';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(QueueNames.AUTH) private readonly client: ClientProxy,
  ) { }

  public async getUser(id: string) {
    return firstValueFrom(this.client.send({ cmd: 'getUser' }, id));
  }

  public async verifyEmail(token: string) {
    return firstValueFrom(this.client.send({ cmd: 'verifyEmail' }, token));
  }

  public async createUser(createUserDto: SignUpDto) {
    return firstValueFrom(this.client.send({ cmd: 'createUser' }, createUserDto));
  }

  public async login(loginDto: LoginDto) {
    return firstValueFrom(this.client.send({ cmd: 'login' }, loginDto));
  }

  public validateAccessToken(token: string): IAccessToken {
    return this.jwtService.verify(token, {
      issuer: AuthConstants.access_token.options.issuer,
    });
  }

  public createAccessTokenFromAuthUser(user: any): string {
    const payload = {
      email: user.email,
      id: user.id,
      roles: [user.role],
      type: TokenType.CLIENT,
    };
    return this.jwtService.sign(payload, AuthConstants.access_token.options);
  }
}
