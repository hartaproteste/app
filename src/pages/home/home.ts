import { Component } from '@angular/core';
import { HttpClient } from '../../base';
import { NavController } from 'ionic-angular';
import { ProtestService } from '../../providers';
import { Geolocation, Device } from 'ionic-native';
import { UUID } from 'angular2-uuid';
import * as CryptoJS from 'crypto-js';
import { MapPage, TermsConditionsPage } from '../index';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private shout: string;
  constructor(public navCtrl: NavController, private http: HttpClient, private protestService: ProtestService) {

  }
  
  private ionViewCanEnter()
  {
    if (!localStorage['acceptedtos'])
      this.navCtrl.setRoot(TermsConditionsPage);
  }

  checkIn(){
    
      this.protestService.checkInNow(this.shout);
  }

  clearProtest()
  {
    this.protestService.resetCurrent();
  }

  viewMap() {
    this.navCtrl.setRoot(MapPage);
  }
}
