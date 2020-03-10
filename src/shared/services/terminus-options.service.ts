import { Injectable } from '@nestjs/common';
import {
  TypeOrmHealthIndicator,
  TerminusEndpoint,
  TerminusModuleOptions,
  TerminusOptionsFactory,
} from '@nestjs/terminus';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(
    private readonly _db: TypeOrmHealthIndicator,
  ) {}

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: '/api/health',
      healthIndicators: [
        async () => this._db.pingCheck('database'),
      ],
    };
    return {
      endpoints: [healthEndpoint],
    };
  }
}
