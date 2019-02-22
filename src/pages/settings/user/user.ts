import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { MenuController, ModalController } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';


import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

import { UserFormPage } from '../user-form/user-form';

/**
 * Generated class for the ConfigUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  user: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private log: NGXLogger,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,

    private userService: UserService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.onFetchList();
  }

  onFetchList() {
    let loader = this.loadingCtrl.create({
      content: 'Récuperation en cours…'
    });
    loader.present();


    this.userService.retrieveData(this.authService.email).subscribe(
      //=====
      // subscribe
      (userLoc) => {
        loader.dismiss();
        // For display
        this.user = userLoc;

        this.log.debug('UserPage - onFetchList',
          this.authService.email, this.user);

        this.toastCtrl.create({
          message: 'Données récupérées !',
          duration: 1000,
          position: 'bottom'
        }).present();

        if (!this.user) {
          this.log.debug('UserPage - onFetchList');
          this.navCtrl.push(UserFormPage);
        } else {
          this.log.debug(this.user.email);
        }


      },
      (error) => {

        this.log.debug('user.ts - onFetchList ERROR ', this.authService.email,
          error);

        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
      // subscribe
      //=====
    );


    /*
        if (this.usersList == 0) {
          this.navCtrl.push(UserFormPage);
        }
        */
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigUserPage');
    this.log.debug(this.user);
  }

  onLoadPage() {
    console.log('onLoadPAge ConfigUserPage');

  }

  buttonEditUser() {
    this.navCtrl.push(UserFormPage);
  }
}
