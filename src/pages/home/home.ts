import { Component } from '@angular/core';
import { HttpClient } from '../../base';
import { NavController } from 'ionic-angular';
import { ProtestService } from '../../providers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {


  private shout: string;
  constructor(public navCtrl: NavController, private http: HttpClient, private protestService: ProtestService) {

  }

  checkIn(){
    this.protestService.checkInNow(this.shout);
  }
}
