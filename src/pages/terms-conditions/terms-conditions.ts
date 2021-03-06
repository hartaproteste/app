import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform, Content } from 'ionic-angular';
import { HomePage } from '../'
import { Diagnostic } from 'ionic-native';
import { LoggerService } from '../../providers/logger.service';
import { Geolocation } from 'ionic-native';

/*
  Generated class for the TermsConditions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-terms-conditions',
  templateUrl: 'terms-conditions.html'
})
export class TermsConditionsPage {
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private log: LoggerService) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsConditionsPage');
  }

  acceptTos() {
    this.requireGeoPermission().then(() => {
      localStorage["acceptedtos"] = "true";
      this.navCtrl.setRoot(HomePage);
    });
  }

  exit() {
    this.platform.exitApp();
  }

  changeOrientation() {
    this.content.resize();
  }

  requireGeoPermission() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition().then(pos => {
        this.log.info(pos);
        resolve();
      }).catch((reason) => {
        this.log.error(reason);
        reject();
      });
    })

  }
}
