import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { ProtestService } from '../providers';

import {
  HomePage,
  MapPage
} from '../pages';


@Component({
  templateUrl: 'app.html',
  encapsulation: ViewEncapsulation.None
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform, private protestService: ProtestService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      
        this.protestService.processQueue();
    });

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Harta proteste', component: MapPage }
    ];
  }

openLocations(){
  this.nav.pop(MapPage);
}

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
