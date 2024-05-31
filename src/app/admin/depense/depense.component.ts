import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DepenseDialogComponent} from "./depense-dialog.component";
import {Depense} from "./depense";
import {DepenseService} from "./depense.service";
@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html'
})
export class DepenseComponent implements OnInit {
  displayedColumns: string[] = ['des', 'da', 'mon', 'cat','action'];
  depenses: Depense[] = [];
  constructor(public dialog: MatDialog, private depenseService: DepenseService) {
  }

  ngOnInit(): void {
    this.fetchAll()
  }

  fetchAll() {
    this.depenseService.fetchAll().subscribe({
      next: (r) => {
        this.depenses = r.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      error: (err) => {
        console.log('Error while fetching depenses');
      }
    })
  }

  delete(id: string) {
    this.depenseService.delete(id).then(r => {
      this.fetchAll()
    })
  }

  update(depense: Depense) {
    const dialogRef = this.dialog.open(DepenseDialogComponent, {
      width: '500px',
      data: depense
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DepenseDialogComponent, {
      width: '500px',
    });
  }

}
