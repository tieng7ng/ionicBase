import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { MenuController, ModalController } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

//=====
// Pages
import { AppareilSinglePage } from './appareil-single/appareil-single';
import { AppareilFormPage } from './appareil-form/appareil-form';
// Pages
//=====

//=====
// Services
import { Appareil } from '../../models/Appareil';
import { AppareilsService } from '../../services/appareils.service';
// Services
//=====

@Component({
  selector: 'page-appareils',
  templateUrl: 'appareils.html'
})

export class AppareilsPage {

  appareilsList: Appareil[];
  appareilsSubscription: Subscription;

  constructor(
    private appareilsService: AppareilsService,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private log: NGXLogger

  ) { }

  ionViewWillEnter() {
    this.appareilsList = this.appareilsService.appareilsList.slice();
    console.log('>>> ionViewWillEnter appareilsList', this.appareilsList);

  }


  ngOnInit() {
    this.onFetchList();
  }

  ngOnDestroy() {
//    this.appareilsSubscription.unsubscribe();
  }

  /**
   * load page SingleAppareil
   * @param index : position
   */
  onLoadAppareil(index: number) {
    let modal = this.modalCtrl.create(AppareilSinglePage, { index: index });
    // Affichage de la page
    modal.present();
  }

  /**
   * Menu display
   */
  menuToggle() {
    console.log('>>> Open Menu');
    this.menuCtrl.open();
  }

  /**
   * Create appareil
   */
  onNewAppareil() {
    this.navCtrl.push(AppareilFormPage);
  }

  /**
   * 
   */

  onSaveList() {
    this.log.debug('appareils - onSaveList');

    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde en cours…'
    });
    loader.present();

    this.appareilsService.saveAllAppareils().subscribe(
      //=====
      // subscribe
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données enregistrées !',
          duration: 3000,
          position: 'bottom'
        }).present();
      },
      (error) => {
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
  }

  onFetchList() {
    let loader = this.loadingCtrl.create({
      content: 'Récuperation en cours…'
    });
    loader.present();
    this.appareilsService.retrieveData().subscribe(
      //=====
      // subscribe
      (appareilsListLoc) => {
        loader.dismiss();
        // For display
        this.appareilsList = appareilsListLoc;

        // For store in current
        this.appareilsService.appareilsList = appareilsListLoc;

        this.toastCtrl.create({
          message: 'Données récupérées !',
          duration: 1000,
          position: 'bottom'
        }).present();
      },
      (error) => {
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

  }

}