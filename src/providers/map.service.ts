﻿import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { CONFIG_TOKEN, IConfig } from './config';
import { LoggerService } from './logger.service';
import { HttpClient } from '../base';

@Injectable()
export class MapService {

  /**
   * Creates an instance of RssService.
   *
   * @param {Http} http
   * @param {RssChannels} rss_channel_list
   * @param {Config} config
   *
   * @memberOf RssService
   */
  constructor(private http: HttpClient, @Inject(CONFIG_TOKEN) private config: IConfig, private log: LoggerService) {
  }

  public getCities() {
    return new Promise<Array<any>>((resolve, reject) => {
      let resp = new Array<any>();
      if (this.config.sample) {
        resp.push(
          { name: "București", value: 176000 },
          { name: "Cluj", value: 35875 },
          { name: "Timișoara", value: 20140 },
          { name: "Iași", value: 17619 },
          { name: "Sibiu", value: 15396 },
          { name: "Brașov", value: 8194 },
          { name: "Constanța", value: 5468 },
          { name: "Piatra Neamț", value: 2000 }
        );
        resolve(resp);
      } else {
        this.log.error('getCities() prod not implemented yet');
        reject('not implemented yet');
      }
    });
  }
}
