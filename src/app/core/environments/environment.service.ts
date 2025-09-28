import {Injectable} from '@angular/core';

export interface BaseEnvironmentService {
  get executionEnvironment(): string | undefined
}

@Injectable()
export class EnvironmentService implements BaseEnvironmentService {

  constructor() {}

  get executionEnvironment(): string | undefined {
    if (typeof window !== 'undefined') {
      const env = (window as any).__env
      return env.ENV;
    }
    return undefined;
  }
}
