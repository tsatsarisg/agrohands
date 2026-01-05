import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(@InjectConnection() private connection: Connection) {
    this.logConnectionStatus();
  }

  private logConnectionStatus(): void {
    if (this.connection.readyState === 1) {
      this.logger.log('Connected to MongoDB!');
    } else {
      this.logger.warn('MongoDB connection not ready');
    }
  }

  getConnection(): Connection {
    return this.connection;
  }

  async isConnected(): Promise<boolean> {
    return this.connection.readyState === 1;
  }
}
