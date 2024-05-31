import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import firebase from 'firebase/compat';
import { Farmer } from "../admin/farmer/farmer";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  userConnected: any;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async signIn(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  async signUp(farmer: Farmer) {
    try {
      if (farmer.email && farmer.password) {
        const credential = await this.afAuth.createUserWithEmailAndPassword(farmer.email, farmer.password);
        // await this.signIn('hadilhamdi@gmail.com', 'aaaaaa')
        await this.updateUserData(credential.user, farmer); // create user document in Firestore
      }
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }


  async signOut() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  async updateUserData(user: firebase.User | null, farmer: Farmer) {
    // Sets user data to firestore on login
    if (user) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const data = {
        uid: user.uid,
        email: user.email,
        fName: farmer.fName,
        lName: farmer.lName,
        phone: farmer.phone,
        roles: farmer.role = true
       
      };
      await userRef.set(data, { merge: true });
    }
  }

  // Check if user is admin
  isAdmin(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (!user) return of(false);
        return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
      }),
      map(userData => !!userData && !!userData.roles && !!userData.roles.admin)
    );
  }
  getinfoUser(email: any) {

    return this.afs.collection("users", ref => ref.where('email', '==', email)).valueChanges();


  }
}
