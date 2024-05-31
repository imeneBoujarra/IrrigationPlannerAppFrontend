import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TreatmentDialogComponent} from "./treatment-dialog.component";
import {Treatment} from "./treatment";
import {TreatmentService} from "./treatment.service";
import {Product} from "../product/product";
import {ProductService} from "../product/product.service";


@Component({
  selector: 'app-sector',
  templateUrl: './treatment.component.html'
})
export class TreatmentComponent implements OnInit {
  displayedColumns: string[] = [ 'se','products','qte','te','start','end','action',];
  treatments: Treatment[] = [];
  products: Product[] = [];
 
  
  constructor(public dialog: MatDialog, private treatmentService: TreatmentService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.fetchAll()
    this.fetchProducts()
    
  }

  fetchAll() {
    this.treatmentService.fetchAll().subscribe({
      next: (r) => {
        this.treatments = r.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          // Convert start date
          if (data.start && data.start.toDate) {
            data.start = data.start.toDate();
          }
          // Convert end date
          if (data.end && data.end.toDate) {
            data.end = data.end.toDate();
          }
          return data;
        });
      },
      error: (err) => {
        console.log('Error while fetching depenses', err);
      }
    });
  }
  

  fetchProducts() {
    this.productService.fetchAll().subscribe({
      next: (r) => {
        this.products = r.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      error: (err) => {
        console.log('Error while fetching products');
      }
    })
  }

  getProductName(id: string): string | null {
    const product = this.products.find(s => s.id === id);
    // Check both product and product.name for undefined
    return product && product.name ? product.name : null;
}


  delete(id: string) {
    this.treatmentService.delete(id).then(r => {
      this.fetchAll()
    })
  }

  update(treatment: Treatment) {
    const dialogRef = this.dialog.open(TreatmentDialogComponent, {
      width: '500px',
      data: {
        treatment,
        products: this.products
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(TreatmentDialogComponent, {
      width: '500px',
      data: {
        products: this.products
      }
    });
  }


 
}