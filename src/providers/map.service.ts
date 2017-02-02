import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { CONFIG_TOKEN, IConfig } from './config';
import { LoggerService } from './logger.service';


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
  constructor(private http: Http, @Inject(CONFIG_TOKEN) private config: IConfig, private log: LoggerService) {
  }

  public getCities(): Array<any> {
    let resp = new Array<any>();
    resp.push(
      { name: "Bucuresti", value: 125000 },
      { name: "Brasov", value: 10000 }
    );
    return resp;
  }

}
