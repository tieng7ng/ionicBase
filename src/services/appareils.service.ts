import { Injectable } from '@angular/core';

// creation and utility methods
import { Observable, Subject, pipe, observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { NGXLogger } from 'ngx-logger';

import { Appareil } from '../models/Appareil';

@Injectable()
export class AppareilsService {

  appareils$ = new Subject<Appareil[]>();

  appareilsList: Appareil[] = [];

  private appareilsCollection: AngularFirestoreCollection;
  private appareilDoc: AngularFirestoreDocument<Appareil>;

  constructor(
    private fireStore: AngularFirestore,
    private log: NGXLogger
  ) {
    //    this.appareilsCollection = this.fireStore.collection('appareils');
    this.appareilsCollection = this.fireStore.collection('appareils', ref => ref.orderBy('name'));

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
    this.log.debug('appareils.service - retrieveData');

    let profcollection: any[] = [];

    return new Observable((observer) => {

      //===========================
      // Appareils list
      let docId = this.appareilsCollection.snapshotChanges().pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Appareil;
          const id = a.payload.doc.id;
          // delete ID
          delete(data._id); 
          return { id, ...data };
        });
      }));

      let tabAppareil: Appareil[] = [];

      // build appareil list
      docId.subscribe(docs => {
        if (tabAppareil.length == 0) {
          docs.forEach(doc => {
            tabAppareil.push(doc);
            console.log(doc);
          });
        }
        this.appareilsList = tabAppareil;
        observer.next(tabAppareil);
      });
      // Appareils list
      //===========================

    });

  }


  saveAllAppareils(): Observable<boolean> {
    this.log.debug('appareils.service - saveAllAppareils');
    return new Observable((observer) => {
      this.appareilsList.forEach(doc => {
        this.log.debug('>>> saveAllAppareils', doc);
        if (doc._id) {
          this.saveAppareil(doc._id, doc);
        } else {
          this.addAppareil(doc);
        }
      });
      observer.next(true);
    });
  }

  saveAppareil(appId: string, appareil: Appareil) {
    //Get the task document
    this.appareilDoc = this.fireStore.doc<Appareil>('appareils' + `/${appId}`);
    this.appareilDoc.update(appareil);

  }

  addAppareil(appareil: Appareil): Observable<boolean> {
    return new Observable((observer) => {
      this.log.debug('AppareilsService', appareil, JSON.parse(JSON.stringify(appareil)));
      
//      appareilLoc = JSON.stringify(appareil);
      this.appareilsCollection.add(JSON.parse(JSON.stringify(appareil)));
      this.appareilsList.push(appareil);
      observer.next(true);
    })
  }

  emitAppareils() {
    this.appareils$.next(this.appareilsList.slice());
  }

}