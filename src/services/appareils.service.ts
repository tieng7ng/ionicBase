import { Injectable } from '@angular/core';

// creation and utility methods
import { Observable, Subject, pipe } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

import { Appareil } from '../models/Appareil';

@Injectable()
export class AppareilsService {

  appareils$ = new Subject<Appareil[]>();

  //  private ref = firebase.firestore();


  appareilsList: Appareil[] = [
    {
      name: 'Machine à laver',
      description: [
        'Volume: 6 litres',
        'Temps de lavage: 2 heures',
        'Consommation: 173 kWh/an'
      ],
      isOn: true,
      startTime: '',
      endTime: '',
    },
    {
      name: 'Télévision',
      description: [
        'Dimensions: 40 pouces',
        'Consommation: 22 kWh/an'
      ],
      isOn: true,
      startTime: '',
      endTime: '',

    },
    {
      name: 'Ordinateur',
      description: [
        'Marque: fait maison',
        'Consommation: 500 kWh/an'
      ],
      isOn: false,
      startTime: '',
      endTime: '',
    }
  ];

  constructor(
    private fireStore: AngularFirestore
  ) {

  }

  /*
    saveData() {
      return new Promise((resolve, reject) => {
        firebase.database().ref('appareils').set(this.appareilsList).then(
          (data: DataSnapshot) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }
    */

  /*
    saveData() {
      return new Promise((resolve, reject) => {
        firebase.database().ref('appareils').set(this.appareilsList).then(
          (data: DataSnapshot) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }
  */

 retrieveData(): Observable<Appareil[]> {
  let profcollection: Appareil[];

  return new Observable((observer) => {
    const appareilsDoc = this.fireStore.collection('appareils');
    appareilsDoc.valueChanges().subscribe((profile: Appareil[]) => {

      profcollection = profile;
      console.log('>>>> retrieveData - return ', profcollection);
      // retourne la donnée
      observer.next(profcollection);
    });


  });

}


  addAppareil(appareil: Appareil) {
    this.appareilsList.push(appareil);
  }

  emitAppareils() {
    this.appareils$.next(this.appareilsList.slice());
  }

}