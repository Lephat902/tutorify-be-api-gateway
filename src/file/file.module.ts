import { Module } from '@nestjs/common'
import { AuthService } from '../auth/auth.service'
import { FileController } from './file.controller'
import { FileService } from './file.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  controllers: [FileController],
  imports: [HttpModule],  
  providers: [AuthService, FileService],
})
export class FileModule {}
