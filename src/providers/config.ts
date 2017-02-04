import { OpaqueToken } from '@angular/core';

export interface IConfig {
  logLevel: string;
  url: string;
  sample: boolean;
  refreshStatusInterval: number;
  offlinePollingInterval: number;
  autoCheckoutDistance: number;
}

export const Config : IConfig = {
  logLevel: 'DEBUG',
  url: 'https://api.hartaproteste.ro',
  sample: true,
  offlinePollingInterval: 10,
  refreshStatusInterval: 10,
  autoCheckoutDistance: 1000,
}

export const CONFIG_TOKEN = new OpaqueToken('config_mobile');
