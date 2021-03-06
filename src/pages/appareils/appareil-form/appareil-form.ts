import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';

import { Appareil } from '../../../models/Appareil';

import { AppareilsService } from '../../../services/appareils.service';
import { app } from 'firebase';


@Component({
  selector: 'page-appareil-form',
  templateUrl: './appareil-form.html'
})
export class AppareilFormPage implements OnInit {

  appareilsList: Appareil[];

  appareilForm: FormGroup;
  appareilcontrol: FormControl;

  constructor(
    private log: NGXLogger,
    private appareilsService: AppareilsService,
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppareilFormPage');
  }

  ngOnInit() {
    this.initForm();
//    this.onAddDescription();
  }

  initForm() {
    this.appareilcontrol = new FormControl(null, Validators.required);
    this.appareilForm = this.formBuilder.group({
      name: this.appareilcontrol,
      description: this.formBuilder.array([])
    });
  }

  getDescriptionArray() {
    return this.appareilForm.get('description') as FormArray;
  }

  onAddDescription() {
    console.log('>>> appareil form : onAddDescription');
    let newControl = this.formBuilder.control('');
    this.getDescriptionArray().controls.push(newControl);
    this.appareilForm.get('name')
  }

  onRemoveDescription(index: number) {
    console.log('>>> appareil form : onRemoveDescription');
    this.getDescriptionArray().removeAt(index);
  }

  onSubmitForm() {
    let newAppareil = new Appareil(this.appareilForm.get('name').value);
    for (let control of this.getDescriptionArray().controls) {
      newAppareil.description.push(control.value);
    }
    this.appareilsService.addAppareil(newAppareil).subscribe(
      (Boolean) => {
        this.log.debug('ADD OK', newAppareil);
      },
      (error) => {
        this.log.debug(error);
      }
    );
    this.navCtrl.pop();
  }
}