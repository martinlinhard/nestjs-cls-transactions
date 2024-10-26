import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Transactional, TransactionHost } from '@nestjs-cls/transactional';
import { TxAdapter } from '../../app.module';
import { AccountService } from '../account/account.service';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class UserService {
  constructor(
    private readonly txHost: TransactionHost<TxAdapter>,
    private readonly accountsService: AccountService,
    private readonly clsService: ClsService,
  ) {}

  public get userRepository() {
    return this.txHost.tx.getRepository(User);
  }

  @Transactional()
  public async createOrUpdate() {
    await this.userRepository.save(new User({ name: 'Martin' }));
    await this.accountsService.createOrUpdate();
  }
}
