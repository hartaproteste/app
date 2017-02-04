import { Component, Inject, Renderer } from '@angular/core';
import { HttpClient } from '../../base';
import { NavController } from 'ionic-angular';
import { MapService } from '../../providers/map.service';
import { CONFIG_TOKEN, IConfig } from '../../providers/config';
import { HomePage, LocationMapPage } from '../index';
import { TermsConditionsPage } from '../';


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  items: Array<any>;
  total: number;
  selectedValue: string;


  constructor(public navCtrl: NavController, private http: HttpClient, private mapService: MapService, private renderer: Renderer) {
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

  openProtestMap(item: any){

    this.navCtrl.push(LocationMapPage, { data: item });
  }

  private ionViewCanEnter()
  {
    if (!localStorage['acceptedtos'])
      this.navCtrl.setRoot(TermsConditionsPage);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.selectedValue = val;
      this.filterItems();
    }
  }

  filterItems() {
    if (this.selectedValue) {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(this.selectedValue.toLowerCase()) > -1);
      });
    }
  }

  hitEnter() {
    this.renderer.invokeElementMethod(event.target, 'blur');
  }

  doRefresh(refresher) {
    this.initializeItems();
    this.filterItems();
    refresher.complete();
  }

  back() {
    this.navCtrl.setRoot(HomePage);
  }
}
