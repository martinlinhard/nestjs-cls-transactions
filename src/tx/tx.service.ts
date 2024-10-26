import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TxAdapter } from '../app.module';

@Injectable()
export class TxService {
  constructor(private readonly txHostInjected: TransactionHost<TxAdapter>) {}

  public get txHost() {
    return this.txHostInjected;
  }
}
