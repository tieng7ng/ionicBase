import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menuCtrl: MenuController,

  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }


  onToggleMenu() {
    console.log('>>> Open Menu');
    this.menuCtrl.open();
  }
}
