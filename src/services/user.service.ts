import { Injectable } from '@angular/core';

// creation and utility methods
import { Observable, Subject, pipe, observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { NGXLogger } from 'ngx-logger';

import { User } from '../models/User';

@Injectable()
export class UserService {

  user: User;

  private userCollection: AngularFirestoreCollection;
  private userDoc: AngularFirestoreDocument<User>;

  constructor(
    private fireStore: AngularFirestore,
    private log: NGXLogger
  ) {
    //    this.appareilsCollection = this.fireStore.collection('appareils');

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


  retrieveData(email: string): Observable<User> {
    this.log.debug('user.service - retrieveData');

    return new Observable((observer) => {

      //===========================
      // Appareils list
      this.userCollection = this.fireStore.collection('users', ref => ref.where("email", "==", email));

      let docId = this.userCollection.snapshotChanges().pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as User;
          const _id = a.payload.doc.id;
          // delete ID
          delete (data._id);
          return { _id, ...data };
        });
      }));


      // build appareil list
      docId.subscribe(docs => {
        this.log.debug('user.service retriveData', email,
          docs);
        this.user = docs[0];
        observer.next(docs[0]);
      });
      // Appareils list
      //===========================

    });

  }

  saveUser(userId: string, user: User) {
    //Get the task document
    this.userDoc = this.fireStore.doc<User>('users' + `/${userId}`);
    this.userDoc.update(user);

  }

  addUser(user: User): Observable<boolean> {
    return new Observable((observer) => {
      this.log.debug('AppareilsService', user, JSON.parse(JSON.stringify(user)));

      //      appareilLoc = JSON.stringify(appareil);
      this.userCollection.add(JSON.parse(JSON.stringify(user)));
      observer.next(true);
    })
  }

}