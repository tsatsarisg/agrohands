import { z } from 'zod';

export const configSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  PORT: z.coerce.number().int().positive().default(3001),
  DB_NAME: z.string().default('agrohands'),
  DOCKER_MONGO_URL: z.string().optional(),
  WORKER_COLLECTION_NAME: z.string().default('workers'),
  USER_COLLECTION_NAME: z.string().default('users'),
  JOB_COLLECTION_NAME: z.string().default('jobs'),
  JWT_SECRET: z.string().default('agrohands-secret'),
  ENCRYPTION_KEY: z
    .string()
    .min(32)
    .default('agrohands-encryption-key-change-in-production'),
  COOKIE_SECURE: z.coerce.boolean().default(false),
  COOKIE_NAME: z.string().default('auth_token'),
});

export type Config = z.infer<typeof configSchema>;
