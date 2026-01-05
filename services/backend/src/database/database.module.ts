import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';
import { CONFIG_TOKEN } from '../config/config.factory';
import { Config } from '../config/config.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [CONFIG_TOKEN],
      useFactory: (config: Config) => ({
        uri: config.DOCKER_MONGO_URL,
        dbName: config.DB_NAME,
      }),
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
