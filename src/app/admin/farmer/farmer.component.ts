import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FarmerDialogComponent} from "./farmer-dialog.component";
import {Farmer} from "./farmer";
import {FarmerService} from "./farmer.service";
@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html'
})
export class FarmerComponent implements OnInit {
  displayedColumns: string[] = ['fName', 'lName', 'email', 'phone'];
  farmers: Farmer[] = [];
  constructor(public dialog: MatDialog, private farmerService: FarmerService) {
  }

  ngOnInit(): void {
    this.fetchAll()
  }

  fetchAll() {
    this.farmerService.fetchAll().subscribe({
      next: (r) => {
        this.farmers = r.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      error: (err) => {
        console.log('Error while fetching farmers');
      }
    })
  }

/*
  delete(id: string) {
    this.farmerService.delete(id).then(r => {
      this.fetchAll()
    })
  }
*/

/*  update(farmer: Farmer) {
    const dialogRef = this.dialog.open(FarmerDialogComponent, {
      width: '500px',
      data: farmer
    });
    dialogRef.afterClosed().subscribe(r => {
      this.fetchAll()
    });
  }*/

  openDialog() {
    const dialogRef = this.dialog.open(FarmerDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(r => {
      this.fetchAll()
    });
  }

}
