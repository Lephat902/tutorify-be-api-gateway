import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { AuthConstants } from './auth.constants';
import { CreateUserDto, LoginDto, UserDto } from './auth.dto';
import { IAccessToken, TokenType } from './auth.interfaces';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('AUTH_SERVICE') private client: ClientProxy
  ) { }

  public async getUser(id: string): Promise<UserDto> {
    return lastValueFrom(this.client.send<UserDto>({ cmd: 'getUser' }, id))
      .catch((error) => {
        throw new HttpException(error, error.status);
      });
  }

  public async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    console.log(createUserDto);
    return firstValueFrom(this.client.send<UserDto>({ cmd: 'createUser' }, createUserDto))
      .catch((error) => {
        throw new HttpException(error, error.status);
      });
  }

  public async login(loginDto: LoginDto): Promise<UserDto> {
    return firstValueFrom(this.client.send<UserDto>({ cmd: 'login' }, loginDto))
      .catch((error) => {
        throw new HttpException(error, error.status);
      });
  }

  public validateAccessToken(token: string): IAccessToken {
    return this.jwtService.verify(token, {
      issuer: AuthConstants.access_token.options.issuer,
    });
  }

  public createAccessTokenFromAuthUser(user: UserDto): string {
    const payload = {
      email: user.email,
      id: user.id,
      roles: [user.role],
      type: TokenType.CLIENT,
    };
    return this.jwtService.sign(payload, AuthConstants.access_token.options);
  }
}
