import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cueillette } from "./cueillette";
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CueilletteService {
  constructor(private afs: AngularFirestore) { }

  // add student
  create(cueillette: Cueillette) {

    cueillette.id = this.afs.createId();
    return this.afs.collection('/cueillettes').add(cueillette)
  }

  fetchAll() {
    return this.afs.collection('/cueillettes').snapshotChanges();
  }

  delete(id: string) {
    return this.afs.doc('/cueillettes/' + id).delete();
  }

  update(id: string, cueillette: Cueillette) {
    return this.afs.doc('/cueillettes/' + id).update(cueillette);
  }

  getDocumentsByArrayField(fieldName: string, values: any[]): Observable<any[]> {
    const queries = values.map(value =>
      this.afs.collection("cueillettes", ref => ref.where(fieldName, '==', value)).valueChanges()
    );

    return combineLatest(queries).pipe(
      map(results => results.reduce((acc, cur) => acc.concat(cur), []))
    );
  }
}
