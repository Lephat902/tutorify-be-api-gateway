import {
  Body,
  Controller,
  UseGuards,
  Param,
  Patch,
  Delete,
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
import { UserRole } from '@tutorify/shared';
import { UpdateDto, UpdateStudentDto, UpdateTutorDto } from '../dtos/update';

@Controller()
@ApiTags('authentication')
@UseGuards(TokenGuard)
export class UserController {
  constructor(private readonly authService: AuthService) { }

  @Patch('users/:userId/password/reset')
  @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN])
  @ApiOperation({
    summary: "Admin reset user's password and send it to user's email",
  })
  @ApiBearerAuth()
  public async resetPasswordByAdmin(@Param('userId') userId: string) {
    return this.authService.resetPasswordByAdmin(userId);
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
  public async deleteUserById(@Param('userId') id: string) {
    return this.authService.deleteUser({ id });
  }

  @Delete('users/username/:username')
  @ApiOperation({ summary: 'Admin deletes a user by username' })
  @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN])
  @ApiBearerAuth()
  public async deleteUserByUsername(@Param('username') username: string) {
    return this.authService.deleteUser({ username });
  }

  @Delete('users/email/:email')
  @ApiOperation({ summary: 'Admin deletes a user by email' })
  @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN])
  @ApiBearerAuth()
  public async deleteUserByEmail(@Param('email') email: string) {
    return this.authService.deleteUser({ email });
  }
}
