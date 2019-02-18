import { Injectable } from '@angular/core';

// creation and utility methods
import { Observable, Subject, pipe } from 'rxjs';
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

    let profcollection: any[] = [];

    return new Observable((observer) => {

      //===========================
      // Appareils list
      let docId = this.appareilsCollection.snapshotChanges().pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Appareil;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));

      let tabAppareil: Appareil[] = [];

      // build appareil list
      docId.subscribe(docs => {
        docs.forEach(doc => {
          tabAppareil.push(doc);
          console.log(doc);
        });

        this.appareilsList = tabAppareil;
        observer.next(tabAppareil);
      });
      // Appareils list
      //===========================

      //      console.log('>>> tabAppareil', tabAppareil);
      //      observer.next(tabAppareil);
      /*
      
      
            appareilsDoc.valueChanges().subscribe((profile: Appareil[]) => {
              profcollection = profile;
      
              console.log('>>>> retrieveData - return ', profcollection);
              for (var property1 in profcollection) {
                console.log(profcollection[property1]);
              }
      
              console.log('>>> profcollection', profcollection);
      
              // retourne la donnée
              observer.next(profcollection);
            });
            */
    });

  }


  saveAllAppareils(): Observable<boolean> {
    this.log.debug('appareils.service - saveAllAppareils');
    return new Observable((observer) => {
      this.appareilsList.forEach(doc => {
        console.log('>>> saveAllAppareils', doc);
        if (doc.id) {
          this.saveAppareil(doc.id, doc);
        } else {
          this.addAppareil(doc);
        }
      });
      console.log('>>> saveAllAppareils');
      observer.next(true);
    });
  }

  saveAppareil(appId: string, appareil: Appareil) {
    //Get the task document
    this.appareilDoc = this.fireStore.doc<Appareil>('appareils' + `/${appId}`);
    this.appareilDoc.update(appareil);

  }

  addAppareil(appareil: Appareil) {
//    this.appareilsCollection.add(appareil);
    this.appareilsList.push(appareil);
  }

  emitAppareils() {
    this.appareils$.next(this.appareilsList.slice());
  }

}