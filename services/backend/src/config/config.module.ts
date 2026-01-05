import { Module, Global } from '@nestjs/common';
import { createConfig, CONFIG_TOKEN } from './config.factory';

@Global()
@Module({
  providers: [
    {
      provide: CONFIG_TOKEN,
      useFactory: createConfig,
    },
  ],
  exports: [CONFIG_TOKEN],
})
export class ConfigModule {}
