import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Vente } from "./vente";
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VenteService {
  constructor(private afs: AngularFirestore) { }

  // add student
  create(vente: Vente) {

    vente.id = this.afs.createId();
    return this.afs.collection('/ventes').add(vente)
  }

  fetchAll() {
    return this.afs.collection('/ventes').snapshotChanges();
  }

  delete(id: string) {
    return this.afs.doc('/ventes/' + id).delete();
  }

  update(id: string, vente: Vente) {
    return this.afs.doc('/ventes/' + id).update(vente);
  }

  getDocumentsByArrayField(fieldName: string, values: any[]): Observable<any[]> {
    const queries = values.map(value =>
      this.afs.collection("ventes", ref => ref.where(fieldName, '==', value)).valueChanges()
    );

    return combineLatest(queries).pipe(
      map(results => results.reduce((acc, cur) => acc.concat(cur), []))
    );
  }
}
