import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';

import { Journaliere } from './journaliere';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class JournaliereService {
  constructor(private route: ActivatedRoute, private afs: AngularFirestore) { }

  create(journaliere: Journaliere) {
    journaliere.id = this.afs.createId();
    return this.afs.collection('/irrigations').add(journaliere)
  }

  fetchAll(): Observable<any[]> {
    return this.afs.collection("irrigations").valueChanges();

  }
  fetchDataBySecteur(collectionName: string, planification: string): Observable<any[]> {
    return this.afs.collection(collectionName, ref => ref.where('planificationId', '==', planification)).valueChanges();
  }
}
