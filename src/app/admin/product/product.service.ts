import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Product } from './product';
import { ProductAgr } from '../product-agr/productagr';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private afs : AngularFirestore) { }

  // add student
  create(product : Product) {

    product.id = this.afs.createId();
    return this.afs.collection('/products').add(product)
  }

  fetchAll() {
    return this.afs.collection('/products').snapshotChanges();
  }

  delete(id : string) {
    return  this.afs.doc('/products/'+id).delete();
  }

  update(id: string, product: Product) {
    return this.afs.doc('/products/' + id).update(product);
  }
  updateProductQuantities(productAgr: ProductAgr): Promise<void> {
    const batch = this.afs.firestore.batch();

    // Ensure updates array is never undefined by defaulting to an empty array if productAgr.products is undefined
    const updates = (productAgr.products || []).map(productId => {
      const productRef = this.afs.firestore.collection('products').doc(productId);

      return productRef.get().then(doc => {
        if (!doc.exists) {
          throw new Error(`Product not found: ${productId}`);
        }
        const product = doc.data() as Product;
        if ((product.qty || 0) - productAgr.qty < 0) {
          throw new Error(`Not enough stock for product ID ${productId}`);
        }
        batch.update(productRef, {
          consumedQty: firebase.firestore.FieldValue.increment(productAgr.qty),
        });
      });
    });

    // Ensure Promise.all receives an array even if updates is empty
    return Promise.all(updates).then(() => batch.commit());
  }
  addProductUsageAndUpdateProduct(productAgr: ProductAgr) {
    return this.afs.collection('productAgr').add(productAgr).then(docRef => {
      return docRef.get().then(doc => {
        const productAgr = doc.data() as ProductAgr;
        const batch = this.afs.firestore.batch();
  
        productAgr.products?.forEach(productId => {
          const productRef = this.afs.firestore.collection('products').doc(productId);
          batch.update(productRef, {
            consumedQty: firebase.firestore.FieldValue.increment(productAgr.qty || 0)
          });
        });
  
        return batch.commit();
      });
    });
  }
  
  fetchAllProducts() {
    return this.afs.collection('products').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        return Product.fromFirestore(data);
      }))
    );
  }
  
}
