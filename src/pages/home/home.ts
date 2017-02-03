import { Component } from '@angular/core';
import { HttpClient } from '../../base';
import { NavController } from 'ionic-angular';
import { ProtestService } from '../../providers';
import { Geolocation, Device } from 'ionic-native';
import { UUID } from 'angular2-uuid';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private shout: string;
  constructor(public navCtrl: NavController, private http: HttpClient, private protestService: ProtestService) {

  }

  checkIn(){
    if (!localStorage['uuid'])
      localStorage['uuid'] = Device.uuid ? Device.uuid : UUID.UUID();
    let uuid = localStorage['uuid'];
    uuid = btoa(CryptoJS.AES.encrypt(uuid, 'NOWEIMFElmmWJKnwKEJFWNwkjEWNPOF').ciphertext.toString());
    Geolocation.getCurrentPosition().then((resp) => {
      var data = {
        lat: resp.coords.latitude,
        lon: resp.coords.longitude,
        prec: resp.coords.accuracy,
        shout: this.shout,
        ts: new Date().getTime()/1000,
        uid: uuid
      };

      this.protestService.checkIn(data);
    });
  }
}
