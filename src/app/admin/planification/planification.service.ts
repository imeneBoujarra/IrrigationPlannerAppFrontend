import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Planification } from './planification';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanificationService {
  constructor(private afs: AngularFirestore) { }
  create(planification: Planification) {
    planification.id = this.afs.createId();
    return this.afs.collection('/planifications').add(planification)
  }
  fetchAll() {
    return this.afs.collection('/planifications').snapshotChanges();
  }
  delete(id: string) {
    return this.afs.doc('/planifications/' + id).delete();
  }
  update(id: string, planification: Planification) {
    return this.afs.doc('/planifications/' + id).update(planification);
  }

  fetchTodaysIrrigationData(): Observable<Planification[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.afs.collection<Planification>('planifications').snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as any;
            const _id = action.payload.doc.id;
            return { _id, ...data };
          });
        })
      )
  }
}
