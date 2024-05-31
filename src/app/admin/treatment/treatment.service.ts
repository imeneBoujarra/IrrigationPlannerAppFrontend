import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Treatment} from "./treatment";


@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  constructor(private afs : AngularFirestore) { }

  // add student
  create(treatment : Treatment) {

    treatment.id = this.afs.createId();
    return this.afs.collection('/treatments').add(treatment)
  }

  fetchAll() {
    return this.afs.collection('/treatments').snapshotChanges();
  }

  delete(id : string) {
    return  this.afs.doc('/treatments/'+id).delete();
  }

  update(id: string, treatment: Treatment) {
    return this.afs.doc('/treatments/' + id).update(treatment);
  }
}
