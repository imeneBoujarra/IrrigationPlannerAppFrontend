import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Farmer} from "./farmer";
import {AuthService} from "../../services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";


@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  constructor(private afs : AngularFirestore, private authService: AuthService, private afAuth: AngularFireAuth) { }

  // add student
  create(farmer: Farmer) {
    return this.authService.signUp(farmer)
  }

  fetchAll() {
    return this.afs.collection('/users').snapshotChanges();
  }

/*  delete(id : string) {
    return  this.afs.doc('/users/'+id).delete();
  }

  update(id: string, farmer: Farmer) {
    return this.afs.doc('/users/' + id).update(farmer);
  }*/
}
