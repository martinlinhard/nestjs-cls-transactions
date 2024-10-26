import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './domain/user/user.module';
import { AccountModule } from './domain/account/account.module';
import { ClsModule } from 'nestjs-cls';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
      plugins: [
        new ClsPluginTransactional({
          imports: [
            // module in which the database instance is provided
            TypeOrmModule,
          ],
          adapter: new TransactionalAdapterTypeOrm({
            // the injection token of the database instance
            dataSourceToken: getDataSourceToken(),
          }),
        }),
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'pocdb',
      autoLoadEntities: true,
      synchronize: false,
    }),
    UserModule,
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
