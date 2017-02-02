import { OpaqueToken } from '@angular/core';

export interface IConfig {
  logLevel: string;
  url: string;
}

export const Config : IConfig = {
  logLevel: 'DEBUG',
  url: 'http://localhost:8100/api'
  //url: 'https://[]'
}

export const CONFIG_TOKEN = new OpaqueToken('config_mobile');
