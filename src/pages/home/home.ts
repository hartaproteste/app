import { Component, ViewChild, NgZone, Input } from '@angular/core';
import { HttpClient } from '../../base';
import { NavController, Content, Platform, NavParams } from 'ionic-angular';
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

  cssMap: string;
  height: string;

  @Input()
  private selectedProtest: any = {};
  private map: any;
  private shout: string;
  private mapCenter = new google.maps.LatLng(45.9216941, 25.0069466);

  constructor(public navCtrl: NavController, private http: HttpClient, private protestService: ProtestService, private platform: Platform, private zone: NgZone, public params: NavParams) {
    this.selectedProtest = params.get('selectedProtest') || {};
    platform.ready().then(() => {
      this.loadMap();
    });
    this.cssMap = "full";
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

  openLocations() {
    this.navCtrl.setRoot(MapPage);
  }

  loadMap() {

    let zoom = 6;
    let mapOptions = {
      center: this.mapCenter,
      zoom: zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      },
    }
    let map = document.getElementById('map');
    this.map = new google.maps.Map(map, mapOptions);
    this.drawProtests();
    this.selectProtest(this.selectedProtest);
  }

  drawProtests() {
    this.protestService.protests.forEach(protest => {
      protest.circle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: this.map,
        center: new google.maps.LatLng(protest.lat, protest.lon),
        radius: 300
      });
      protest.marker = new google.maps.Marker({
        position: new google.maps.LatLng(protest.lat, protest.lon),
        map: this.map,
        icon: 'assets/images/fist.png'
      });
      protest.marker.addListener('click', () => {
        this.selectProtest(protest);

      });

    });


    this.map.addListener('zoom_changed', () => {
      // 3 seconds after the center of the map has changed, pan back to the
      // marker.
      if (this.map.zoom <= 12 && this.selectedProtest.id) {
        this.selectProtest({});
      }

    });
  }

  selectProtest(protest) {
    this.zone.run(() => {
      this.selectedProtest = protest;
      console.log(this.selectedProtest);


      this.map.setCenter(protest.id ? protest.marker.position : this.mapCenter);
      this.map.setZoom(protest.id ? 15 : 6);

      if (this.selectedProtest.id) {
        let cent = this.map.getCenter();
        this.cssMap = "half";

        google.maps.event.trigger(this.map, "resize");
        this.map.setCenter(cent);
      }



    });
  }
  pinSymbol(color) {
    return {
      path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
      fillColor: color,
      fillOpacity: 1,
      strokeColor: '#000',
      strokeWeight: 1,
      scale: 1,
      labelOrigin: new google.maps.Point(0, -29)
    };
  }
}
