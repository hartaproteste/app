import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Logger } from 'angular2-logger/core';
import { MyApp } from './app.component';
import {
  AboutPage,
  ContactPage,
  HomePage
} from '../pages';
import { CONFIG_TOKEN, Config } from '../providers/config';
import { LoggerService } from '../providers/logger.service';

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
    LoggerService
  ]
})
export class AppModule { }
