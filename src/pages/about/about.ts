import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoggerService } from '../../providers/logger.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public log: LoggerService) {
    this.log.info("About page constructor");
  }

}
