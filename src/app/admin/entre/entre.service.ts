import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Entre } from "./entre";
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntreService {
  constructor(private afs: AngularFirestore) { }

  create(entre: Entre) {
    entre.id = this.afs.createId();
    return this.afs.collection('/entres').add(entre);
  }

  fetchAll() {
    return this.afs.collection('/entres').snapshotChanges();
  }

  delete(id: string) {
    return this.afs.doc('/entres/' + id).delete();
  }

  update(id: string, entre: Entre) {
    return this.afs.doc('/entres/' + id).update(entre);
  }

  getDocumentsByArrayField(fieldName: string, values: any[]): Observable<any[]> {
    const queries = values.map(value =>
      this.afs.collection("/entres", ref => ref.where(fieldName, '==', value)).valueChanges()
    );

    return combineLatest(queries).pipe(
      map(results => results.reduce((acc, cur) => acc.concat(cur), []))
    );
  }
}
