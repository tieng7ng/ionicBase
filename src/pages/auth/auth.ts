import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})

export class AuthPage {

  private mode: string;
  private authForm: FormGroup;

  private errorMessage: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    private authService: AuthService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }

  ngOnInit() {
    console.log('>>> auth - ngOnInit');

    this.mode = this.navParams.get('mode');

    console.log(this.navParams, 'mode  ', this.mode);

    this.initForm();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmitForm() {
    console.log('>>> onSubmitForm');

    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;

    console.log('mode  ', this.mode);

    if (this.mode === 'new') {
      console.log('>>> new');

      this.authService.signUpUser(email, password).then(
        () => {
          console.log('>>> new OK');
          this.navCtrl.setRoot(TabsPage);
        },
        (error) => {
          console.log(error);
          this.errorMessage = error;
        }
      );
    } else if (this.mode === 'connect') {
      console.log('>>> connexion');

      this.authService.signInUser(email, password).then(
        () => {
          console.log('connexion OK');
          this.navCtrl.setRoot(TabsPage);
        },
        (error) => {
          console.log(error);
          this.errorMessage = error;
        }
      );
    }
    console.log('>>> onSubmitForm END');
  }

}
