import { Body, Query, Controller, Get, Post, UseGuards, UploadedFiles, UseInterceptors, UploadedFile } from '@nestjs/common'
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { TokenGuard } from './token.guard'
import { Token } from './token.decorator'
import { IAccessToken, TokenType } from './auth.interfaces'
import { TokenRequirements } from './token-requirements.decorator'
import { LoginDto, SignUpStudentDto, SignUpTutorDto, VerifyEmailDto, } from './dtos'
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express'
import { UserRole } from '@tutorify/shared'
import { validateAvatar, validatePortfolios } from './helpers'

@Controller()
@ApiTags('authentication')
@UseGuards(TokenGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

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
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Sign up a new student' })
  public async signUpStudent(
    @Body() signupStudentDto: SignUpStudentDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    if (avatar)
      await validateAvatar(avatar);

    const fullSignupStudentDto: SignUpStudentDto & { role: string } = {
      ...signupStudentDto,
      avatar,
      role: UserRole.STUDENT,
    }

    const student = await this.authService.createUser(fullSignupStudentDto);
    return this.returnUserAndToken(student);
  }

  @Post('tutors/signup')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'portfolios', maxCount: 10 }
  ]))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Sign up a new tutor' })
  public async signUpTutor(
    @Body() signupTutorDto: SignUpTutorDto,
    @UploadedFiles() files?: { avatar?: Express.Multer.File[], portfolios?: Express.Multer.File[] },
  ) {
    const { portfolios } = files;
    const avatar = files.avatar?.[0] ?? undefined;

    if (avatar)
      await validateAvatar(avatar);
    if (portfolios)
      await validatePortfolios(portfolios);

    const fullSignupTutorDto: SignUpTutorDto & { role: string } = {
      ...signupTutorDto,
      portfolios,
      avatar,
      role: UserRole.TUTOR,
    }

    const tutor = await this.authService.createUser(fullSignupTutorDto);
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
