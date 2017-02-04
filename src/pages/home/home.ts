import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '../../base';
import { NavController, Content, Platform } from 'ionic-angular';
import { ProtestService } from '../../providers';
import { Geolocation, Device } from 'ionic-native';
import { UUID } from 'angular2-uuid';
import * as CryptoJS from 'crypto-js';
import { MapPage, TermsConditionsPage } from '../index';
declare var google: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  host: {
    '(window:resize)': 'changeOrientation($event)'
  },
})
export class HomePage {
  @ViewChild(Content) content: Content;

  private map: any;
  private shout: string;
  constructor(public navCtrl: NavController, private http: HttpClient, private protestService: ProtestService, private platform: Platform) {
    platform.ready().then(()=>{
      this.loadMap();
    });
  }

  private ionViewCanEnter() {
    if (!localStorage['acceptedtos'])
      this.navCtrl.setRoot(TermsConditionsPage);
  }

  checkIn() {

    this.protestService.checkInNow(this.shout);
  }

  clearProtest() {
    this.protestService.resetCurrent();
  }

  viewMap() {
    this.navCtrl.push(MapPage);
  }

  changeOrientation() {
    this.content.resize();
  }

 
  loadMap(){
 
    let latLng = new google.maps.LatLng(-34.9290, 138.6010);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    let map = document.getElementById('map');
    this.map = new google.maps.Map(map, mapOptions);
 
  }
}
