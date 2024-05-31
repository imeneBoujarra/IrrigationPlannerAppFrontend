import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Tache } from "./tache";
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  constructor(private afs: AngularFirestore) { }

  // add student
  create(tache: Tache) {

    tache.id = this.afs.createId();
    return this.afs.collection('/taches').add(tache)
  }

  fetchAll() {
    return this.afs.collection('/taches').snapshotChanges();
  }

  delete(id: string) {
    return this.afs.doc('/taches/' + id).delete();
  }

  update(id: string, tache: Tache) {
    return this.afs.doc('/taches/' + id).update(tache);
  }

  getDocumentsByArrayField(fieldName: string, values: any[]): Observable<any[]> {
    const queries = values.map(value =>
      this.afs.collection("taches", ref => ref.where(fieldName, '==', value)).valueChanges()
    );

    return combineLatest(queries).pipe(
      map(results => results.reduce((acc, cur) => acc.concat(cur), []))
    );
  }
}
