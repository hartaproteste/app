import { Injectable, Inject, NgZone } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { CONFIG_TOKEN, IConfig } from '../providers/config';
import { LoggerService } from './logger.service';
import { HttpClient } from '../base';
import { Observable } from 'rxjs';
import { Geolocation, Device } from 'ionic-native';
import { UUID } from 'angular2-uuid';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class ProtestService {

  public currentProtest: any = { id: 1 };
  private interval: number;
  private refreshStatusInterval: number;
  private hasHttpError: boolean = false;

  constructor(private http: HttpClient, @Inject(CONFIG_TOKEN) private config: IConfig, private zone: NgZone) {
  }

  checkInNow(shout: string) {
    if (!localStorage['uuid'])
      localStorage['uuid'] = Device.uuid ? Device.uuid : UUID.UUID();
    let uuid = localStorage['uuid'];
    uuid = btoa(CryptoJS.AES.encrypt(uuid, 'NOWEIMFElmmWJKnwKEJFWNwkjEWNPOF').ciphertext.toString());
    Geolocation.getCurrentPosition().then((resp) => {
      var data = {
        lat: resp.coords.latitude,
        lon: resp.coords.longitude,
        prec: resp.coords.accuracy,
        shout: shout,
        ts: new Date().getTime() / 1000,
        uid: uuid
      };

      this.checkIn(data);
    });
  }
  checkIn(data: any) {
    if (this.hasHttpError)
      return;
    var obs = this.http.post('/', data);

    obs
      .timeout(2000)
      .map(res => res.json()).subscribe(res => {
        this.currentProtest = res;
        if (!this.refreshStatusInterval) {
          this.refreshStatusInterval = setInterval(()=>this.refreshCurrentEvent(), this.config.refreshStatusInterval*1000);
      }},
      err => {
        this.handleError(data)
      }
      )

    return obs;
  }
  private refreshCurrentEvent() {
    Geolocation.getCurrentPosition().then(pos => {
      if (this.distance(pos.coords.latitude, pos.coords.longitude, this.currentProtest.lat, this.currentProtest.lon, 'K')>this.config.autoCheckoutDistance/1000) {
        this.currentProtest = { id: 1 };
        clearInterval(this.refreshStatusInterval);
        this.refreshStatusInterval = undefined;
      }
    });
  }
  private handleError(data) {
    this.hasHttpError = true;
    if (localStorage['queue']) {
      let queue: any[] = JSON.parse(localStorage['queue']);
      if (!queue.find(itm => itm.uuid === data.uuid && itm.ts === data.ts)) {
        queue.push(data);
        localStorage['queue'] = JSON.stringify(queue);
        if (!this.interval)
          this.interval = setInterval(() => {
            this.processQueue();
      }, this.config.offlinePollingInterval*1000);
      }
    }
    else {
      localStorage['queue'] = JSON.stringify([data]);
      if (!this.interval)
        this.interval = setInterval(() => {
          this.processQueue();
    }, this.config.offlinePollingInterval*1000);
    }
  }

  public processQueue() {
    console.log(localStorage['queue']);
    if (localStorage['queue']) {
      this.hasHttpError = false;
      let queue: any[] = JSON.parse(localStorage['queue']);
      //ping the service
      this.checkIn(queue[0]).subscribe(res => {
        queue.splice(0, 1);
        queue.forEach(data => {
          this.checkIn(data);
        });
        clearInterval(this.interval);
        this.interval = undefined;
        localStorage.removeItem('queue');

      });
    }
  }

  distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist
  }
}
