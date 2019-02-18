import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { firebaseConfig } from './credentials';

// creation and utility methods
import { Observable, Subject, pipe } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


import { HomePage } from '../pages/home/home';
import { AuthPage } from '../pages/auth/auth';
import { OptionsPage } from '../pages/options/options';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  //=====
  // Pages
  tabsPage: any = TabsPage;
  optionsPage: any = OptionsPage;
  authPage: any = AuthPage;
  // Pages
  //=====

  isAuth: boolean;

  @ViewChild('content') content: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private fireStore: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.afAuth
      .auth.onAuthStateChanged(
        (user) => {
          if (user) {
            //====
            // user sign in
            this.isAuth = true;
            this.content.setRoot(TabsPage);
            // user sign in
            //====
          } else {
            //====
            // user sign out
            this.isAuth = false;
            this.content.setRoot(AuthPage, { mode: 'connect' });
            // user sign out
            //====
          }
        }
      );

    });
  }

  /**
   * used by menu for display plage
   * @param page : display page
   * @param data 
   */
  onNavigate(page: any, data?: {}) {
    console.log('>>> app component - onNavigate');
    this.content.setRoot(page, data ? data : null);
    this.menuCtrl.close();
  }


  onDisconnect() {
    firebase.auth().signOut();
    this.menuCtrl.close();
  }
}

