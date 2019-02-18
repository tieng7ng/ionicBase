import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Appareil } from '../../models/Appareil';

import { AppareilsService } from '../../services/appareils.service';


@Component({
  selector: 'page-appareil-form',
  templateUrl: './appareil-form.html'
})
export class AppareilFormPage implements OnInit {

  appareilsList: Appareil[];

  appareilForm: FormGroup;

  constructor(
    private appareilsService: AppareilsService,
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppareilFormPage');
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.appareilForm = this.formBuilder.group({
      name: ['', Validators.required],
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
    this.appareilsService.addAppareil(newAppareil);
    this.navCtrl.pop();
  }
}