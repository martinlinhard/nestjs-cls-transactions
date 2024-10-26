import { Injectable } from '@nestjs/common';
import {
  InjectTransactionHost,
  Transactional,
} from '@nestjs-cls/transactional';
import { TxHost } from '../../app.module';
import { Account } from './account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectTransactionHost()
    private readonly txHost: TxHost,
  ) {}

  private get accountRepository() {
    return this.txHost.tx.getRepository(Account);
  }

  @Transactional()
  public async createOrUpdate() {
    await this.accountRepository.save(new Account({ name: 'Martin' }));
    // This is used to simulate a failing transaction
    throw new Error();
  }
}
