import {
  Body,
  Query,
  Controller,
  Get,
  Post,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
  UploadedFile,
  Param,
  Patch,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
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
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { UserRole } from '@tutorify/shared';
import { validateAvatar, validatePortfolios } from './helpers';
import { UpdateDto, UpdateStudentDto, UpdateTutorDto } from './dtos/update';
import { ParseSocialProfilesInTutorSignUpDtoPipe } from '../pipes';

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

  @Post('tutors/signup')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'portfolios', maxCount: 10 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Sign up a new tutor.' })
  public async signUpTutor(
    @Body(new ParseSocialProfilesInTutorSignUpDtoPipe()) signupTutorDto: SignUpTutorDto,
    @UploadedFiles()
    files?: {
      avatar?: Express.Multer.File[];
      portfolios?: Express.Multer.File[];
    },
  ) {
    const avatar = files.avatar?.[0] ?? undefined;
    return this.handleSignUp(signupTutorDto, UserRole.TUTOR, {
      ...files,
      avatar: avatar,
    });
  }

  @Post('students/signup')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Sign up a new student.' })
  public async signUpStudent(
    @Body() signUpStudentDto: SignUpStudentDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.handleSignUp(signUpStudentDto, UserRole.TUTOR, {
      avatar
    });
  }

  @Post('managers/signup')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Admin creates new manager.' })
  @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN])
  @ApiBearerAuth()
  public async signUpManager(
    @Body() signUpManagerDto: SignUpDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.handleSignUp(signUpManagerDto, UserRole.MANAGER, {
      avatar
    });
  }

  @Post('login')
  @ApiOperation({ summary: 'Sign in user via email/username and password' })
  public async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    return this.returnUserAndToken(user);
  }

  @Patch('tutors/profile')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'portfolios', maxCount: 10 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Tutor updates profile.' })
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
  @ApiBearerAuth()
  public async updateTutor(
    @Body(new ParseSocialProfilesInTutorSignUpDtoPipe()) updateTutorDto: UpdateTutorDto,
    @Token() token: IAccessToken,
    @UploadedFiles()
    files?: {
      avatar?: Express.Multer.File[];
      portfolios?: Express.Multer.File[];
    },
  ) {
    const avatar = files.avatar?.[0] ?? undefined;
    return this.handleUpdate(token, updateTutorDto, {
      ...files,
      avatar: avatar,
    });
  }

  @Patch('students/profile')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Student updates profile.' })
  @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
  @ApiBearerAuth()
  public async updateStudent(
    @Body() updateStudentDto: UpdateStudentDto,
    @Token() token: IAccessToken,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.handleUpdate(token, updateStudentDto, {
      avatar
    });
  }

  @Patch('managers/profile')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Manager/Admin updates profile.' })
  @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN, UserRole.MANAGER])
  @ApiBearerAuth()
  public async updateAdminOrManager(
    @Body() updateDto: UpdateDto,
    @Token() token: IAccessToken,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.handleUpdate(token, updateDto, {
      avatar
    });
  }

  @Delete('tutors/profile/portfolios/:portfolioId')
  @ApiOperation({ summary: 'Tutor updates profile.' })
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
  @ApiBearerAuth()
  public async deleteSingleTutorPortfolio(
    @Param('portfolioId') portfolioId: string,
    @Token() token: IAccessToken,
  ) {
    const tutorId = token.id;
    return this.authService.deleteSingleTutorPortfolio(tutorId, portfolioId);
  }

  @Patch('tutors/:tutorId/approve')
  @ApiOperation({ summary: 'Admin/Manager approves a tutor to the system' })
  @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN, UserRole.MANAGER])
  @ApiBearerAuth()
  public async approveTutor(@Param('tutorId') tutorId: string) {
    return this.authService.approveTutor(tutorId);
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

  private returnUserAndToken(user: any) {
    return {
      user,
      token: this.authService.createAccessTokenFromAuthUser(user),
    };
  }

  private async handleSignUp(
    signupDto: SignUpDto,
    role: UserRole,
    files?: {
      avatar?: Express.Multer.File;
      portfolios?: Express.Multer.File[];
    },
  ) {
    if (role !== UserRole.STUDENT && role !== UserRole.TUTOR) {
      throw new BadRequestException(`Unknown user role ${role}`);
    }

    const { portfolios, avatar } = files;

    if (avatar) await validateAvatar(avatar);
    if (portfolios) await validatePortfolios(portfolios);

    const signupDtoWithAvatar: SignUpDto = {
      ...signupDto,
      avatar,
    };

    const fullSignupDto: SignUpDto & { role: UserRole } = {
      ...signupDtoWithAvatar,
      role,
      ...(role === UserRole.TUTOR && { portfolios }),
    };

    return this.authService.createUser(fullSignupDto);
  }

  private async handleUpdate(
    token: IAccessToken,
    updateDto: UpdateDto,
    files?: {
      avatar?: Express.Multer.File;
      portfolios?: Express.Multer.File[];
    },
  ) {
    const { id, roles } = token;
    const role = roles[0];
    const { portfolios, avatar } = files;

    if (avatar) await validateAvatar(avatar);
    if (portfolios) await validatePortfolios(portfolios);

    const updateDtoWithAvatar: UpdateDto = {
      ...updateDto,
      avatar,
    };

    const fullUpdateDto: UpdateDto = {
      ...updateDtoWithAvatar,
      ...(role === UserRole.TUTOR && { portfolios }),
    };

    return this.authService.updateUser(id, fullUpdateDto);
  }

}
