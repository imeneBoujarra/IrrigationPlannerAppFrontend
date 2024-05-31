import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Depense } from "./depense";
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {
  constructor(private afs: AngularFirestore) { }

  // add student
  create(depense: Depense) {

    depense.id = this.afs.createId();
    return this.afs.collection('/depenses').add(depense)
  }

  fetchAll() {
    return this.afs.collection('/depenses').snapshotChanges();
  }

  delete(id: string) {
    return this.afs.doc('/depenses/' + id).delete();
  }

  update(id: string, depense: Depense) {
    return this.afs.doc('/depenses/' + id).update(depense);
  }

  getDocumentsByArrayField(fieldName: string, values: any[]): Observable<any[]> {
    const queries = values.map(value =>
      this.afs.collection("depenses", ref => ref.where(fieldName, '==', value)).valueChanges()
    );

    return combineLatest(queries).pipe(
      map(results => results.reduce((acc, cur) => acc.concat(cur), []))
    );
  }
}
