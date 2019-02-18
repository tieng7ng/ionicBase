import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from './credentials';


//=====
// Page
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AppareilsPage } from '../pages/appareils/appareils';
import { AppareilFormPage } from '../pages/appareil-form/appareil-form';
import { AuthPage } from '../pages/auth/auth';
import { OptionsPage } from '../pages/options/options';
import { SingleAppareilPage } from '../pages/single-appareil/single-appareil';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
// Page
//=====

//=====
// Services
import { AppareilsService } from '../services/appareils.service';
import { AuthService } from '../services/auth.service';
// Services
//=====


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AppareilsPage,
    AppareilFormPage,
    AuthPage,
    OptionsPage,
    SettingsPage,
    SingleAppareilPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AppareilsPage,
    AppareilFormPage,
    AuthPage,
    OptionsPage,
    SettingsPage,
    SingleAppareilPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppareilsService,
    AuthService
  ]
})
export class AppModule { }
