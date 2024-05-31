import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ProductDialogComponent} from "./product-dialog.component";
import {Product} from "./product";
import {ProductService} from "./product.service";
@Component({
  selector: 'app-sector',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['name', 'four', 'useMethod', 'desc', 'qty', 'consumedQty', 'remainingQty', 'action'];
  products: Product[] = [];
  constructor(public dialog: MatDialog, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.fetchAll() 
    this.productService.fetchAllProducts().subscribe(products => {
        this.products = products;
    })
    }
    
  

  fetchAll() {
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

  delete(id: string) {
    this.productService.delete(id).then(r => {
      this.fetchAll()
    })
  }

  update(product: Product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '500px',
      data: product
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '500px',
    });
  }

}
