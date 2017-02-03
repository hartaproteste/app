import { Component, Inject } from '@angular/core';
import { HttpClient } from '../../base';
import { NavController } from 'ionic-angular';
import { MapService } from '../../providers/map.service';
import { CONFIG_TOKEN, IConfig } from '../../providers/config';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  items: Array<any>;
  total: number;


  constructor(public navCtrl: NavController, private http: HttpClient,  private mapService: MapService) {
    this.initializeItems();
  }

  initializeItems() {
    this.items = this.mapService.getCities();
    this.total = this.getTotal();
  }

  getTotal(): number {
    var result = 0;
    for (let item of this.items) {
      result += item.value;
    }
    return result;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  back() {
    this.navCtrl.pop();
  }
}
