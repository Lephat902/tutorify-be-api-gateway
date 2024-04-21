import {
  Body,
  Query,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '../auth.service';
import { TokenGuard } from '../guards';
import { Token, TokenRequirements } from '../decorators';
import { IAccessToken, TokenType } from '../auth.interfaces';
import {
  LoginDto,
  SignUpDto,
  SignUpStudentDto,
  SignUpTutorDto,
  VerifyEmailDto,
} from '../dtos';
import { UserRole } from '@tutorify/shared';

@Controller()
@ApiTags('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('profile')
  @ApiOperation({ summary: 'Get self information' })
  @ApiBearerAuth()
  @TokenRequirements(TokenType.CLIENT, [])
  @UseGuards(TokenGuard)
  public async getSelf(@Token() token: IAccessToken) {
    return this.authService.getUserById(token.id);
  }

  @Get('token/user/:id')
  @TokenRequirements(TokenType.SYSTEM, [])
  @ApiOperation({ summary: 'Get access token by user id' })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  public async getTokenByUserId(@Param('id') id: string) {
    const user = await this.authService.getUserById(id);
    return this.returnUserAndToken(user);
  }

  @Get('confirm-email')
  @ApiOperation({
    summary: 'User click this URL in email received to verify their email',
  })
  public async verifyEmail(@Query() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(verifyEmailDto.token);
  }

  @Post('tutors/signup')
  @ApiOperation({ summary: 'Sign up a new tutor.' })
  public async signUpTutor(
    @Body() signupTutorDto: SignUpTutorDto,
  ) {
    signupTutorDto.role = UserRole.TUTOR;
    return this.authService.createUser(signupTutorDto);
  }

  @Post('students/signup')
  @ApiOperation({ summary: 'Sign up a new student.' })
  public async signUpStudent(
    @Body() signUpStudentDto: SignUpStudentDto,
  ) {
    signUpStudentDto.role = UserRole.STUDENT;
    return this.authService.createUser(signUpStudentDto);
  }

  @Post('managers/signup')
  @ApiOperation({ summary: 'Admin creates new manager.' })
  @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN])
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  public async signUpManager(
    @Body() signUpManagerDto: SignUpDto,
  ) {
    signUpManagerDto.role = UserRole.MANAGER;
    return this.authService.createUser(signUpManagerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Sign in user via email/username and password' })
  public async login(@Body() loginDto: LoginDto) {
    if (!loginDto.username && !loginDto.email)
      throw new BadRequestException("Provide either email or username to log in");
    const user = await this.authService.login(loginDto);
    return this.returnUserAndToken(user);
  }

  private returnUserAndToken(user: any) {
    return {
      user,
      token: this.authService.createAccessTokenFromAuthUser(user),
    };
  }
}
