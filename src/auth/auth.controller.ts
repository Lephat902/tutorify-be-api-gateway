import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateUserDto, LoginDto, UserDto } from './auth.dto'
import { AuthService } from './auth.service'
import { TokenGuard } from './token.guard'
import { Token } from './token.decorator'
import { IAccessToken, TokenType } from './auth.interfaces'
import { TokenRequirements } from './token-requirements.decorator'

@Controller('auth')
@ApiTags('authentication')
@UseGuards(TokenGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get()
  @ApiOperation({ summary: 'Get self information' })
  @ApiBearerAuth()
  @TokenRequirements(TokenType.CLIENT, [])
  public async getSelf(
    @Token() token: IAccessToken
  ): Promise<UserDto> {
    return this.authService.getUser(token.id)
  }

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  public async signup(
    @Body() createUserDto: CreateUserDto
  ): Promise<{ user: UserDto; token: string }> {
    const authUser = await this.authService.createUser(createUserDto)
    return {
      user: authUser,
      token: this.authService.createAccessTokenFromAuthUser(authUser),
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Sign in user via email/username and password' })
  public async login(
    @Body() loginDto: LoginDto
  ): Promise<{ user: UserDto; token: string }> {
    const user = await this.authService.login(loginDto);
    console.log(user)
    return { user, token: this.authService.createAccessTokenFromAuthUser(user) }
  }
}
