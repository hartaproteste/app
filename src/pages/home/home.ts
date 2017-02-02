import { Component } from '@angular/core';
import { HttpClient } from '../../base';
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { LoggerService } from '../../providers/logger.service';
import { MapPage } from '../index';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



  constructor(public navCtrl: NavController, private http: HttpClient, private logger: LoggerService) {

  }

  checkIn() {
    Geolocation.getCurrentPosition().then((resp) => {
      var data = {
        lat: resp.coords.latitude,
        long: resp.coords.longitude,
        prec: resp.coords.accuracy,
        ts: new Date()
      };

      this.http.post('/', data).subscribe(res => alert(res));

    }).catch((error) => {
      this.logger.error('Error getting location', error);
    });
  }

  showMap() {
    this.navCtrl.push(MapPage);
  }
}
