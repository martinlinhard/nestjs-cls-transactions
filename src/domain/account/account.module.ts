import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';

@Module({
  providers: [AccountService],
  imports: [TypeOrmModule.forFeature([Account])],
})
export class AccountModule {}
