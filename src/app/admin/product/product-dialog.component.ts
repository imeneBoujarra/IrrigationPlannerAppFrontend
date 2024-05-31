import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Product} from "./product";
import {ProductService} from "./product.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-download-dialog',
  templateUrl: './product-dialog.component.html',
})
export class ProductDialogComponent {
  
 productForm = this.fb.group({
  name: [this.data ? this.data.name : '', Validators.required],
  four: [this.data ? this.data.four : '', Validators.required],
  useMethod: [this.data ? this.data.useMethod : '', Validators.required],
  desc: [this.data ? this.data.desc : '', Validators.required],
  qty: [this.data ? this.data.qty : '', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
  start: [this.data ? this.data.start : 'defaultStartValue'], // add form control if needed
  end: [this.data ? this.data.end : 'defaultEndValue'], // add form control if needed
  nfo: [this.data ? this.data.nfo : 'defaultNfoValue'], // add form control if needed
  remainingQty : 0
});


  constructor(private fb: FormBuilder, private productService: ProductService, public dialogRef: MatDialogRef<ProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Product) {}
  private product(): Product {
    return {
      ...new Product(),
      id: this.data ? this.data.id : '',
      name: this.productForm.get(['name'])!.value,
      four: this.productForm.get(['four'])!.value,
      useMethod: this.productForm.get(['useMethod'])!.value,
      desc: this.productForm.get(['desc'])!.value,
      qty: this.productForm.get(['qty'])!.value,
      start: this.productForm.get(['start'])?.value || 'defaultStartValue', // Default value or carry-over
      end: this.productForm.get(['end'])?.value || 'defaultEndValue', // Manage undefined 'end'
      nfo: this.productForm.get(['nfo'])?.value || 'defaultNfoValue' ,// Manage undefined 'nfo'
      remainingQty : this.productForm.get(['remainingQty'])?.value  ,// Manage undefined 'nfo'

      
    };
  }
  
  
  onSubmit() {
    if (this.productForm.valid) {
      const product: Product = this.product();
      console.log(product); // Log the product data to be submitted
      if (this.data && this.data.id) {
        this.productService.update(this.data.id, product).then(() => {
          this.dialogRef.close();
        }).catch(error => {
          console.error('Failed to update product:', error);
        });
      } else {
        this.productService.create(product).then(() => {
          this.dialogRef.close();
        }).catch(error => {
          console.error('Failed to create product:', error);
        });
      }
    }
  }
  
}
