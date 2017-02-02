import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoggerService } from '../../providers/logger.service';
import { MapService } from '../../providers/map.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit {

  list: Array<any>;

  constructor(public navCtrl: NavController, public log: LoggerService, public service: MapService) {
    this.log.info("About page constructor");
  }

  ngOnInit() {

    this.list = this.service.getCities();
  }

}
