import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { MenuController, ModalController } from 'ionic-angular';
import { Subscription } from 'rxjs';


//=====
// Pages
import { SingleAppareilPage } from '../single-appareil/single-appareil';
import { AppareilFormPage } from '../appareil-form/appareil-form';
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
    private loadingCtrl: LoadingController
  ) { }

  ionViewWillEnter() {
    this.appareilsList = this.appareilsService.appareilsList.slice();
    console.log('>>> ionViewWillEnter appareilsList', this.appareilsList);

  }


  ngOnInit() {    
    this.appareilsSubscription = this.appareilsService.appareils$.subscribe(
      (appareils: Appareil[]) => {
        this.appareilsList = appareils.slice();
      }
    );
    console.log('>>> ngOnInit appareilsList', this.appareilsList);
    
    this.appareilsService.emitAppareils();
  }

  ngOnDestroy() {
    this.appareilsSubscription.unsubscribe();
  }

  /**
   * load page SingleAppareil
   * @param index : position
   */
  onLoadAppareil(index: number) {
    let modal = this.modalCtrl.create(SingleAppareilPage, { index: index });
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
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde en cours…'
    });
    loader.present();
    /*
    this.appareilsService.saveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données sauvegardées !',
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
    );
    */
  }

  onFetchList() {
    let loader = this.loadingCtrl.create({
      content: 'Récuperation en cours…'
    });
    loader.present();
    this.appareilsService.retrieveData().subscribe(
      (appareilsListLoc) => {
        loader.dismiss();
        // For display
        this.appareilsList = appareilsListLoc;

        // For store in current
        this.appareilsService.appareilsList = appareilsListLoc;
        
        this.toastCtrl.create({
          message: 'Données récupérées !',
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
    );
  }
  
}