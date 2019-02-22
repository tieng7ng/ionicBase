import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from './credentials';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';


//=====
// Page
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AppareilsPage } from '../pages/appareils/appareils';
import { AppareilFormPage } from '../pages/appareils/appareil-form/appareil-form';
//import { AppareilFormPage } from '../pages/appareils/appareil-form/appareil-form';
import { AuthPage } from '../pages/auth/auth';
import { OptionsPage } from '../pages/options/options';
import { AppareilSinglePage } from '../pages/appareils/appareil-single/appareil-single';
import { SettingsPage } from '../pages/settings/settings';
import { UserPage } from '../pages/settings/user/user';
import { UserFormPage } from '../pages/settings/user-form/user-form';

import { TabsPage } from '../pages/tabs/tabs';
// Page
//=====

//=====
// Services
import { AppareilsService } from '../services/appareils.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

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
    UserPage,
    UserFormPage,
    AppareilSinglePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,

    LoggerModule.forRoot({/*serverLoggingUrl: '/api/logs', */
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    }),
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
    UserPage,
    UserFormPage,
    AppareilSinglePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppareilsService,
    AuthService,
    UserService
  ]
})
export class AppModule { }
