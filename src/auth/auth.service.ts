import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { IAccessToken, TokenType } from './auth.interfaces';
import { firstValueFrom } from 'rxjs';
import { FindOneUserOptions, LoginDto, ResetPasswordDto, SignUpDto } from './dtos';
import { QueueNames } from '@tutorify/shared';
import { UserQueryArgs } from './args';
import { UpdateDto } from './dtos/update';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(QueueNames.AUTH) private readonly client: ClientProxy,
  ) { }

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

  public async deleteUser(findOneUserOptions: FindOneUserOptions) {
    return firstValueFrom(this.client.send({ cmd: 'deleteUser' }, findOneUserOptions));
  }

  public async requestResetPassword(email: string) {
    return firstValueFrom(this.client.send({ cmd: 'requestResetPassword' }, email));
  }

  public async resetPassword(resetPasswordDto: ResetPasswordDto) {
    return firstValueFrom(this.client.send({ cmd: 'resetPassword' }, resetPasswordDto));
  }

  public async cleanupTestAccount() {
    return firstValueFrom(this.client.send({ cmd: 'cleanupTestAccount' }, {}));
  }

  public validateAccessToken(token: string): IAccessToken {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException("ExpiredToken");
    }
  }

  public createAccessTokenFromAuthUser(user: any): string {
    const payload = {
      email: user.email,
      id: user.id,
      roles: [user.role],
      type: TokenType.CLIENT,
    };
    return this.jwtService.sign(payload, {
      expiresIn: process.env.EXPIRY_DURATION,
    });
  }
}
