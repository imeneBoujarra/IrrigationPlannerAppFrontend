import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Personel } from './personel';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonelService {
  constructor(private afs: AngularFirestore) { }
  create(personel: Personel) {
    personel.id = this.afs.createId();
    return this.afs.collection('/personels').add(personel)
  }
  fetchAll() {
    return this.afs.collection('/personels').snapshotChanges();
  }
  delete(id: string) {
    return this.afs.doc('/personels/' + id).delete();
  }
  update(id: string, personel: Personel) {
    return this.afs.doc('/personels/' + id).update(personel);
  }

  fetchTodaysIrrigationData(): Observable<Personel[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.afs.collection<Personel>('personels').snapshotChanges()
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
