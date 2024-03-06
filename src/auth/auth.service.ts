import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { AuthConstants } from './auth.constants';
import { IAccessToken, TokenType } from './auth.interfaces';
import { firstValueFrom } from 'rxjs';
import { LoginDto, SignUpDto } from './dtos';
import { QueueNames } from '@tutorify/shared';
import { UserArgs } from './args';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(QueueNames.AUTH) private readonly client: ClientProxy,
  ) {}

  public async getUserById(id: string) {
    if (!id) return null;
    return firstValueFrom(this.client.send({ cmd: 'getUserById' }, id));
  }

  public async getUsers(filters: UserArgs) {
    console.log(filters);
    return firstValueFrom(this.client.send({ cmd: 'getUsers' }, filters));
  }

  public async verifyEmail(token: string) {
    return firstValueFrom(this.client.send({ cmd: 'verifyEmail' }, token));
  }

  public async createUser(createUserDto: SignUpDto) {
    return firstValueFrom(
      this.client.send({ cmd: 'createUser' }, createUserDto),
    );
  }

  public async login(loginDto: LoginDto) {
    return firstValueFrom(this.client.send({ cmd: 'login' }, loginDto));
  }

  public async approveTutor(tutorId: string) {
    return firstValueFrom(this.client.send({ cmd: 'approveTutor' }, tutorId));
  }

  public async blockUser(userId: string) {
    return firstValueFrom(this.client.send({ cmd: 'blockUser' }, userId));
  }

  public async unblockUser(userId: string) {
    return firstValueFrom(this.client.send({ cmd: 'unblockUser' }, userId));
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
