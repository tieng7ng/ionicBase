import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';

import { Appareil } from '../../models/Appareil';
import { AppareilsService } from '../../services/appareils.service';


@Component({
  selector: 'page-single-appareil',
  templateUrl: 'single-appareil.html',
})

export class SingleAppareilPage {

  public index: number;
  public appareil: Appareil;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public appareilsService: AppareilsService,
  ) {
  }

  ngOnInit() {
    console.log('>>> single-appareil', this.navParams.get('appareil'));
    // Param send : page AppareilPage - function onLoadAppareil
    this.index = this.navParams.get('index');

    this.appareil = this.appareilsService.appareilsList[this.index];
  }

  /**
   * close modal
   */
  dismissModal() {
    this.viewCtrl.dismiss();
  }

  /**
   * Change value isOn
   */
  onToggleAppareil() {
    console.log('>> single appareil - onToggleAppareil');
    this.appareil.isOn = !this.appareil.isOn;
  }

  /**
   * Record value of planning
   * @param form 
   */
  onSubmitForm(form: NgForm) {
    console.log(form.value);
    this.dismissModal();
  }

  /**
   * Delete value of planning
   */
  onDeleteHours() {
    this.appareil.startTime = '';
    this.appareil.endTime = '';
    this.dismissModal();
  }
}
