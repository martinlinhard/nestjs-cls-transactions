import { Module } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { UserModule } from './domain/user/user.module';
import { AccountModule } from './domain/account/account.module';
import { ClsModule } from 'nestjs-cls';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import {
  ClsPluginTransactional,
  TransactionHost,
} from '@nestjs-cls/transactional';
import { DatabaseModule } from './database/database.module';
import { TxModule } from './tx/tx.module';

export type TxAdapter = TransactionalAdapterTypeOrm;
export type TxHost = TransactionHost<TransactionalAdapterTypeOrm>;

@Module({
  imports: [
    DatabaseModule,
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
      plugins: [
        new ClsPluginTransactional({
          imports: [DatabaseModule],
          adapter: new TransactionalAdapterTypeOrm({
            // the injection token of the database instance
            dataSourceToken: getDataSourceToken(),
          }),
        }),
      ],
    }),
    UserModule,
    AccountModule,
    TxModule,
  ],
})
export class AppModule {}
