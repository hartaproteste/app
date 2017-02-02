import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { CONFIG_TOKEN, IConfig } from '../providers/config';
import { LoggerService } from './logger.service';
import { HttpClient } from '../base';

@Injectable()
export class ProtestService {
  constructor(private http: HttpClient, @Inject(CONFIG_TOKEN) private config: IConfig) {
  }

  checkIn()
  { 

  }
}
