import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { AuthService } from '../../services/auth.service'

import { UserPage } from './user/user';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private authService: AuthService
  ) { }

  onToggleLights() {
    //=====
    // Build alert
    let alert = this.alertCtrl.create({
      title: 'Êtes-vous certain(e) de vouloir continuer ?',
      subTitle: 'Cette action allumera ou éteindra toutes les lumières de la maison !',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Confirmer',
          handler: () => console.log('Confirmé !')
        }
      ]
    });
    // Build alert
    //=====

    alert.present();
  }

  onLoadPage(pageName: string) {
    this.navCtrl.push(UserPage);

  }
}