import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { HomePage } from '../'

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsConditionsPage');
  }

  acceptTos() {
    localStorage["acceptedtos"] = "true";
    this.navCtrl.setRoot(HomePage);
  }
  exit() {
    this.platform.exitApp();
  }
}
