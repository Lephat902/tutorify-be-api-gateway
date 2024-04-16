import {
  Body,
  Query,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Patch,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokenGuard } from './guards';
import { Token, TokenRequirements } from './decorators';
import { IAccessToken, TokenType } from './auth.interfaces';
import {
  LoginDto,
  SignUpDto,
  SignUpStudentDto,
  SignUpTutorDto,
  VerifyEmailDto,
} from './dtos';
import { UserRole } from '@tutorify/shared';
import { UpdateDto, UpdateStudentDto, UpdateTutorDto } from './dtos/update';

@Controller()
@ApiTags('authentication')
@UseGuards(TokenGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('profile')
  @ApiOperation({ summary: 'Get self information' })
  @ApiBearerAuth()
  @TokenRequirements(TokenType.CLIENT, [])
  public async getSelf(@Token() token: IAccessToken) {
    return this.authService.getUserById(token.id);
  }

  @Get('token/user/:id')
  @TokenRequirements(TokenType.SYSTEM, [])
  @ApiOperation({ summary: 'Get access token by user id' })
  @ApiBearerAuth()
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

  @Patch('users/:userId/password/reset')
  @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN])
  @ApiOperation({
    summary: "Admin reset user's password and send it to user's email",
  })
  @ApiBearerAuth()
  public async resetPasswordByAdmin(@Param('userId') userId: string) {
    return this.authService.resetPasswordByAdmin(userId);
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

  @Patch('tutors/profile')
  @ApiOperation({ summary: 'Tutor updates profile.' })
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
  @ApiBearerAuth()
  public async updateTutor(
    @Body() updateTutorDto: UpdateTutorDto,
    @Token() token: IAccessToken,
  ) {
    return this.authService.updateUser(token.id, updateTutorDto);
  }

  @Patch('students/profile')
  @ApiOperation({ summary: 'Student updates profile.' })
  @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
  @ApiBearerAuth()
  public async updateStudent(
    @Body() updateStudentDto: UpdateStudentDto,
    @Token() token: IAccessToken,
  ) {
    return this.authService.updateUser(token.id, updateStudentDto);
  }

  @Patch('managers/profile')
  @ApiOperation({ summary: 'Manager/Admin updates profile.' })
  @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN, UserRole.MANAGER])
  @ApiBearerAuth()
  public async updateAdminOrManager(
    @Body() updateDto: UpdateDto,
    @Token() token: IAccessToken,
  ) {
    return this.authService.updateUser(token.id, updateDto);
  }

  @Patch('tutors/:tutorId/approve')
  @ApiOperation({ summary: 'Admin/Manager approves a tutor to the system' })
  @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN, UserRole.MANAGER])
  @ApiBearerAuth()
  public async approveTutor(@Param('tutorId') tutorId: string) {
    return this.authService.approveTutor(tutorId);
  }

  @Patch('tutors/:tutorId/reject')
  @ApiOperation({ summary: 'Admin/Manager rejects a tutor' })
  @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN, UserRole.MANAGER])
  @ApiBearerAuth()
  public async rejectTutor(@Param('tutorId') tutorId: string) {
    return this.authService.rejectTutor(tutorId);
  }

  @Patch('users/:userId/block')
  @ApiOperation({ summary: 'Admin/Manager blocks a user' })
  @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN, UserRole.MANAGER])
  @ApiBearerAuth()
  public async blockUser(@Param('userId') userId: string) {
    return this.authService.blockUser(userId);
  }

  @Patch('users/:userId/unblock')
  @ApiOperation({ summary: 'Admin/Manager unblocks a user' })
  @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN, UserRole.MANAGER])
  @ApiBearerAuth()
  public async unblockUser(@Param('userId') userId: string) {
    return this.authService.unblockUser(userId);
  }

  @Delete('users/:userId')
  @ApiOperation({ summary: 'Admin deletes a user' })
  @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN])
  @ApiBearerAuth()
  public async deleteUser(@Param('userId') userId: string) {
    return this.authService.deleteUser(userId);
  }

  private returnUserAndToken(user: any) {
    return {
      user,
      token: this.authService.createAccessTokenFromAuthUser(user),
    };
  }
}
