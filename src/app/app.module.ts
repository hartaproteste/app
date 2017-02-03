import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Logger } from 'angular2-logger/core';
import { MyApp } from './app.component';
import { HttpClient } from '../base';
import {
  AboutPage,
  ContactPage,
  HomePage
} from '../pages';
import { CONFIG_TOKEN, Config } from '../providers/config';
import { LoggerService, ProtestService } from '../providers';

import { MapService } from '../providers/map.service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: CONFIG_TOKEN, useValue: Config },
    Logger,
    LoggerService,
    MapService,
    HttpClient,
    ProtestService
  ]
})
export class AppModule { }
