import { Body, Query, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { TokenGuard } from './token.guard'
import { Token } from './token.decorator'
import { IAccessToken, TokenType, UserRole } from './auth.interfaces'
import { TokenRequirements } from './token-requirements.decorator'
import { LoginDto, SignUpStudentDto, SignUpTutorDto, VerifyEmailDto, } from './dto'

@Controller()
@ApiTags('authentication')
@UseGuards(TokenGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('auth')
  @ApiOperation({ summary: 'Get self information' })
  @ApiBearerAuth()
  @TokenRequirements(TokenType.CLIENT, [])
  public async getSelf(
    @Token() token: IAccessToken
  ) {
    return this.authService.getUser(token.id);
  }

  @Get('confirm-email')
  @ApiOperation({ summary: 'User click this URL in email received to verify their email' })
  public async verifyEmail(
    @Query() verifyEmailDto: VerifyEmailDto,
  ) {
    return this.authService.verifyEmail(verifyEmailDto.token);
  }

  @Post('students/signup')
  @ApiOperation({ summary: 'Sign up a new student' })
  public async signUpStudent(
    @Body() signupStudentDto: SignUpStudentDto
  ) {
    const student = await this.authService.createUser(signupStudentDto, UserRole.STUDENT);
    return this.returnUserAndToken(student);
  }

  @Post('tutors/signup')
  @ApiOperation({ summary: 'Sign up a new tutor' })
  public async signUpTutor(
    @Body() signupTutorDto: SignUpTutorDto
  ) {
    const tutor = await this.authService.createUser(signupTutorDto, UserRole.TUTOR);
    return this.returnUserAndToken(tutor);
  }

  @Post('login')
  @ApiOperation({ summary: 'Sign in user via email/username and password' })
  public async login(
    @Body() loginDto: LoginDto
  ) {
    const user = await this.authService.login(loginDto);
    return this.returnUserAndToken(user);
  }

  private returnUserAndToken(user: any) {
    return {
      user,
      token: this.authService.createAccessTokenFromAuthUser(user),
    }
  }
}
