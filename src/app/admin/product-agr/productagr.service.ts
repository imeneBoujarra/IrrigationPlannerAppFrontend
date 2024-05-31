import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {ProductAgr} from "./productagr";
import { ProductService } from '../product/product.service'; // Adjust the path as necessary


@Injectable({
  providedIn: 'root'
})
export class ProductAgrService {
  constructor(private afs : AngularFirestore,
    private productService: ProductService ) { }

  // add student
  create(productAgr: ProductAgr) {
    productAgr.id = this.afs.createId();
    return this.afs.collection('/productagr').doc(productAgr.id).set(Object.assign({}, productAgr))
      .then(() => {
        // After successfully adding ProductAgr, update the quantities of the products involved
        return this.productService.updateProductQuantities(productAgr);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
        throw error; // Propagate error
      });
  }
  

  fetchAll() {
    return this.afs.collection('/productagr').snapshotChanges();
  }

  delete(id : string) {
    return  this.afs.doc('/productagr/'+id).delete();
  }

  update(id: string, productagr: ProductAgr) {
    return this.afs.doc('/productagr/' + id).update(productagr);
  }

}
