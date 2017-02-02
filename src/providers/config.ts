import { OpaqueToken } from '@angular/core';

export interface IConfig {
  logLevel: string;
  url: string;
}

export const Config : IConfig = {
  logLevel: 'DEBUG',
  url: 'http://138.68.99.250:1989'
  //url: 'https://[]'
}

export const CONFIG_TOKEN = new OpaqueToken('config_mobile');
