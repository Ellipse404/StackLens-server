import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { ThrottlerModule } from '@nestjs/throttler';

import { DocumentationModule } from './modules/documentation/documentation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 60,
      },
    ]),

    DocumentationModule,
  ],
})
export class AppModule {}
