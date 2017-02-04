import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TermsConditionsPage } from '../';

/*
  Generated class for the LocationMap page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-location-map',
  templateUrl: 'location-map.html'
})
export class LocationMapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  private ionViewCanEnter()
  {
    if (!localStorage['acceptedtos'])
      this.navCtrl.setRoot(TermsConditionsPage);
  }


}
