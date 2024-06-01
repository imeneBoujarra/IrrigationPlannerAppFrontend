import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';

import { Irrigation } from './irrigation';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class JournaliereService {
  constructor(private route: ActivatedRoute, private afs: AngularFirestore) { }

  create(journaliere: Irrigation) {
    journaliere.id = this.afs.createId();
    console.log("New irregation : ", journaliere);
    return this.afs.collection('/irrigations').add(journaliere)
  }

  fetchAll(): Observable<any[]> {
    return this.afs.collection("irrigations").valueChanges();

  }

  delete(id: string) {
    return this.afs.doc('/irrigations/' + id).delete();
  }

  fetchDataByPlanification(collectionName: string, planification: string): Observable<any[]> {
    return this.afs.collection(collectionName, ref => ref.where('planificationId', '==', planification)).valueChanges();
  }
  updateIrrigation(id: string, productagr: Irrigation) {
    return this.afs.doc('/irrigations/' + id).update(productagr);
  }

  fetchTodaysIrrigationData(planificationId: string): Observable<Irrigation[]> {
    return this.afs.collection<Irrigation>('irrigations', ref => ref.where('planificationId', '==', planificationId)).snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Irrigation;
            const _id = action.payload.doc.id;
            return { _id, ...data };
          });
        })
      );
  }
 
}









