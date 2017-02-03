import { Injectable, Inject } from '@angular/core';
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

  public getCities(): Array<any> {
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
        { name: "Piatra Neamț", value: 2000 },
        { name: "Vaslui", value: 1253 },
        { name: "Bicaz", value: 400 },
        { name: "Tg. Neamt", value: 321 }
      );
    }

    return resp;
  }
}
