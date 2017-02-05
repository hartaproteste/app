import { Component, Inject, ViewChild, NgZone, Input } from '@angular/core';
import { CONFIG_TOKEN, IConfig } from '../../providers/config';
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

  @Input()
  private selectedProtest: any = {};
  private map: any;
  private location: any;
  private shout: string;
  private zoomedOut: boolean;
  private nearbyProtest: any = {};
  private selectedProtestInRange: boolean;
  private selectedFirstProtest: boolean;
  private mapCenter = new google.maps.LatLng(45.9216941, 25.0069466);
  private userMarker: any;
  constructor(public navCtrl: NavController, private http: HttpClient, private protestService: ProtestService, private platform: Platform, private zone: NgZone, public params: NavParams, @Inject(CONFIG_TOKEN) private config: IConfig) {
    this.selectedProtest = params.get('selectedProtest') || {};
    platform.ready().then(() => {
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
    Geolocation.watchPosition().subscribe((location) => {
      this.location = location;
      if (this.location)
        this.userMarker = new google.maps.Marker({
          position: new google.maps.LatLng(this.location.coords.latitude, this.location.coords.longitude),
          map: this.map,
        });


      if (!this.selectedProtest.id) {
        this.selectProtest(this.selectedProtest);
      }

    });
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


  }

  selectProtest(protest) {
    this.zone.run(() => {
      if (protest.id && this.location) {
        if (this.protestService.distance(this.location.coords.latitude, this.location.coords.longitude, protest.lat, protest.lon, 'K') < this.config.autoCheckoutDistance / 1000) {
          this.selectedProtestInRange=true;
      } 
      else {
        this.selectedProtestInRange = false;
      }
      }

      if (!protest.id && this.location) {

        
        if (this.protestService.distance(this.location.coords.latitude, this.location.coords.longitude, protest.lat, protest.lon, 'K') < this.config.autoCheckoutDistance / 1000) {
          this.nearbyProtest = protest;
        } else {
          this.nearbyProtest = this.protestService.protests.find(itm => this.protestService.distance(this.location.coords.latitude, this.location.coords.longitude, itm.lat, itm.lon, 'K') < this.config.autoCheckoutDistance / 1000) || {};
        }
      }

      if (this.nearbyProtest.id && !protest.id && this.location) {
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(new google.maps.LatLng(this.location.coords.latitude, this.location.coords.longitude));

        bounds.extend(new google.maps.LatLng(this.nearbyProtest.lat, this.nearbyProtest.lon));
        this.map.fitBounds(bounds);
        this.selectedProtestInRange=true;
        protest = this.nearbyProtest || {};
      }
      else {
        this.map.setCenter(protest.id ? protest.marker.position : this.mapCenter);
        this.map.setZoom(protest.id ? 15 : 6);
      }
      this.selectedProtest = protest;
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
