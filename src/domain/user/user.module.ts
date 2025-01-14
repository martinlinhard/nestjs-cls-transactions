import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { AccountModule } from '../account/account.module';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User]), AccountModule],
  controllers: [UserController],
})
export class UserModule {}
