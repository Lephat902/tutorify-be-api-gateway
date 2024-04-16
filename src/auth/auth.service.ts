import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { AuthConstants } from './auth.constants';
import { IAccessToken, TokenType } from './auth.interfaces';
import { firstValueFrom } from 'rxjs';
import { LoginDto, SignUpDto } from './dtos';
import { QueueNames } from '@tutorify/shared';
import { UserQueryArgs } from './args';
import { UpdateDto } from './dtos/update';

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

  public async getUsersAndTotalCount(filters: UserQueryArgs) {
    return firstValueFrom(this.client.send({ cmd: 'getUsersAndTotalCount' }, filters));
  }

  public async verifyEmail(token: string) {
    return firstValueFrom(this.client.send({ cmd: 'verifyEmail' }, token));
  }

  public async resetPasswordByAdmin(userId: string) {
    return firstValueFrom(this.client.send({ cmd: 'resetPasswordByAdmin' }, userId));
  }

  public async createUser(createUserDto: SignUpDto) {
    return firstValueFrom(
      this.client.send({ cmd: 'createUser' }, createUserDto),
    );
  }

  public async updateUser(id: string, updateUserDto: UpdateDto) {
    return firstValueFrom(
      this.client.send({ cmd: 'updateUser' }, {
        id, 
        updateUserDto
      }),
    );
  }

  public async login(loginDto: LoginDto) {
    return firstValueFrom(this.client.send({ cmd: 'login' }, loginDto));
  }

  public async approveTutor(tutorId: string) {
    return firstValueFrom(this.client.send({ cmd: 'approveTutor' }, tutorId));
  }

  public async rejectTutor(tutorId: string) {
    return firstValueFrom(this.client.send({ cmd: 'rejectTutor' }, tutorId));
  }

  public async blockUser(userId: string) {
    return firstValueFrom(this.client.send({ cmd: 'blockUser' }, userId));
  }

  public async unblockUser(userId: string) {
    return firstValueFrom(this.client.send({ cmd: 'unblockUser' }, userId));
  }

  public async deleteUser(userId: string) {
    return firstValueFrom(this.client.send({ cmd: 'deleteUser' }, userId));
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
