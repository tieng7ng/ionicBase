import * as firebase from 'firebase';

export class AuthService {
  isAuth = false;

  constructor() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }

  /**
   * Create user
   * @param email 
   * @param password 
   */
  signUpUser(email: string, password: string) {
    console.log('>>> signUpUser');
    return new Promise((resolve, reject) => {
      
      firebase.auth().createUserWithEmailAndPassword(email, password).then(
        (user) => {
          console.log(user);
          resolve(user);
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  }

  /**
   * Sign in
   * @param email 
   * @param password 
   */
  signInUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(
        (user) => {
          resolve(user);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  signOut() {
    firebase.auth().signOut();
  }
}