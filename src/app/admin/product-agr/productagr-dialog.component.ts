import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ProductAgr} from "./productagr";
import {ProductAgrService} from "./productagr.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../product/product";
import {stockQuantityValidator} from "./stockQuantityValidator"
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-download-dialog',
  templateUrl: './productagr-dialog.component.html',
})
export class ProductAgrDialogComponent  implements OnInit {
  products: Product[] = [];
  ProductAgrForm = this.fb.group({
    products: [this.data.ProductAgr ? this.data.ProductAgr.products : [], [Validators.required,]],
    qty: [this.data.ProductAgr ? this.data.ProductAgr.qty : '', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
}, { validators: stockQuantityValidator(this.products) });


  constructor(private fb: FormBuilder, private productagrservice: ProductAgrService, public dialogRef: MatDialogRef<ProductAgrDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { ProductAgr?: ProductAgr, products: Product[] }) {}

  ngOnInit(): void {
    this.products = this.data.products;
    console.log('Products:', this.products);  // Check the type and contents of products
    this.reapplyValidators(); // Appliquer les validateurs après le chargement des données.
   
    
    
  }
  private reapplyValidators(): void {
    // Réinitialiser le validateur avec les produits chargés
    this.ProductAgrForm.setValidators(stockQuantityValidator(this.products));
    this.ProductAgrForm.updateValueAndValidity(); // Ceci est crucial pour activer les validateurs avec les nouvelles données.
  }
  private productAgr(): ProductAgr {
    return {
      ...new ProductAgr(),
      id: this.data.ProductAgr ? this.data.ProductAgr.id : '',
      products: this.ProductAgrForm.get(['products'])!.value,
      qty: this.ProductAgrForm.get(['qty'])!.value,
    };
  }
  onSubmit() {
    if (this.ProductAgrForm.valid) {
      const productAgr: ProductAgr = this.productAgr()
      if (this.data.ProductAgr && this.data.ProductAgr.id) {
        
        this.productagrservice.update(this.data.ProductAgr.id, productAgr).then(() => {
          this.dialogRef.close();
        });
      } else {
        
        this.productagrservice.create(productAgr).then(() => {
          this.dialogRef.close();
        });
      }
    }
  }
}
