import { Config, configSchema } from './config.schema';
import { ZodError } from 'zod';

export const CONFIG_TOKEN = 'CONFIG';

export function createConfig(): Config {
  try {
    return configSchema.parse(process.env);
  } catch (err) {
    if (err instanceof ZodError) {
      console.error('Config validation failed:');
      for (const e of err.issues) {
        console.error(` - ${e.path.join('.')} : ${e.message}`);
      }
    } else {
      console.error('Unexpected error while building config:', err);
    }
    throw err;
  }
}
