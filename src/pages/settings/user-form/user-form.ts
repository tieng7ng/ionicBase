import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { NGXLogger } from 'ngx-logger';

import { User } from '../../../models/User';

import { AppareilsService } from '../../../services/appareils.service';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { last } from 'rxjs/operators';


@Component({
  selector: 'page-user-form',
  templateUrl: './user-form.html'
})
export class UserFormPage implements OnInit {

  appareilsList: User[];

  userForm: FormGroup;
  birthdayCtrl: FormControl;
  userFirstnameCtrl: FormControl;
  userLastnameCtrl: FormControl;

  userAddressIdCtrl: FormControl;
  userStreetCtrl: FormControl;
  userCountryCtrl: FormControl;
  userCityCtrl: FormControl;


  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,

    private log: NGXLogger,
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad userFormPage');
  }

  ngOnInit() {

    this.log.debug('UserFormPage - ngOnInit');
    this.initForm();

    //    this.onAddDescription();
  }

  initForm() {
    this.log.debug('UserFormPage - initForm');

    let birthdayLoc: Date;
    let lastLoc: string = "";
    let firstLoc: string = "";
    let streetLoc: string = "";
    let cityLoc: string = "";
    let countryLoc: string = "";
    this.log.debug('UserFormPage - initForm', this.userService.user);

    if (this.userService.user) {
      birthdayLoc = this.userService.user.birthday;
      firstLoc = this.userService.user.name.first;
      lastLoc = this.userService.user.name.last;
      streetLoc = this.userService.user.address[0].street;
      cityLoc = this.userService.user.address[0].city;
      countryLoc = this.userService.user.address[0].country;
    } else {

    }
    this.log.debug('UserFormPage - initForm');
    this.birthdayCtrl = new FormControl(
      birthdayLoc,
      [Validators.required]
    );
    this.userLastnameCtrl = this.formBuilder.control(
      lastLoc,
      [Validators.required]
    );

    this.userFirstnameCtrl = this.formBuilder.control(firstLoc,
      [Validators.required]
    );

    //=====
    // build address control
    this.userStreetCtrl = this.formBuilder.control('',
      [Validators.required]);
    this.userCityCtrl = this.formBuilder.control('',
      [Validators.required]);
    this.userCountryCtrl = this.formBuilder.control('',
      [Validators.required]);
    // build address control
    //=====

    this.userForm = this.formBuilder.group({
      name: this.formBuilder.group({
        first: this.userFirstnameCtrl,
        last: this.userLastnameCtrl
      }),
      address: this.formBuilder.array([
      ]),

      birthday: this.birthdayCtrl,
      //description: this.formBuilder.array([])
    });

    const control = <FormArray>this.userForm.controls.address;

    //=====
    // Build address

    if (this.userService.user && this.userService.user.address.length > 0) {
      this.log.debug('address exist', this.userService.user.address);

      //=====
      // Build address exist
      for (let pos in this.userService.user.address) {
        this.log.debug('user', this.userService.user, this.userService.user.address.length);

        control.push(
          this.formBuilder.group({
            street: this.formBuilder.control(streetLoc,
              [Validators.required]),
            city: this.formBuilder.control(cityLoc,
              [Validators.required]),
            country: this.formBuilder.control(countryLoc,
              [Validators.required]),

          })
        );
      }
      // Build address exist
      //=====
    } else {
      //=====
      // Build address empty
      this.log.debug('address no exist');
      control.push(
        this.formBuilder.group({
          street: this.userStreetCtrl,
          country: this.userCountryCtrl,
          city: this.userCityCtrl
        })
      );
      // Build address empty
      //=====

    }
    // Build address
    //=====

  }

  getDescriptionArray() {
    return this.userForm.get('description') as FormArray;
  }

  buttonAddAddress() {
    console.log('>>> user form : buttonAddAddress');
    const control = <FormArray>this.userForm.controls.address;
    control.push(this.formBuilder.group({
      street: this.userStreetCtrl,
      country: this.userCountryCtrl,
      city: this.userCityCtrl
    })
    );
  }

  buttonDeleteAddress(pos: number) {
    const control = <FormArray>this.userForm.controls.address;
    console.log('>>> deleteAddress', control.length);


    if (control.length == 1) {

      this.toastCtrl.create({
        message: 'Doit avoir au moins une address !',
        duration: 1000,
        position: 'bottom'
      }).present();
    } else {
      control.removeAt(pos);

    }
  }


  onRemoveDescription(index: number) {
    console.log('>>> appareil form : onRemoveDescription');
    this.getDescriptionArray().removeAt(index);
  }

  buttonSubmitForm() {

    this.log.debug('>>>>', this.userService.user);
    console.log(this.userForm.value.name.last);
    console.log(this.userForm.value);

    if (this.userService.user) {
      //=====
      // Update
      this.log.debug('>>>> Update ', this.userService.user);
      this.userService.saveUser(this.userService.user._id, this.userForm.value);
      // Update
      //=====
    }
    else {
      //=====
      // Add
      this.log.debug('>>>> ADD ', this.userService.user);
      this.userForm.value.email = this.authService.email;
      this.userService.addUser(this.userForm.value).subscribe(
        () => {
          this.log.debug('add OK');
        },
        (error) => {
          this.log.debug('add KO');
        }
      )
      // Add
      //=====

    }

    // let newAppareil = new Appareil(this.userForm.get('name').value);
    // for (let control of this.getDescriptionArray().controls) {
    //   newAppareil.description.push(control.value);
    // }
    // this.appareilsService.addAppareil(newAppareil).subscribe(
    //   (Boolean) => {
    //     this.log.debug('ADD OK', newAppareil);
    //   },
    //   (error) => {
    //     this.log.debug(error);
    //   }
    // );
    // this.navCtrl.pop();
  }
}