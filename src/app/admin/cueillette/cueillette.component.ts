import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CueilletteDialogComponent} from "./cueillette-dialog.component";
import {Cueillette} from "./cueillette";
import {CueilletteService} from "./cueillette.service";
@Component({
  selector: 'app-cueillette',
  templateUrl: './cueillette.component.html'
})
export class CueilletteComponent implements OnInit {
  displayedColumns: string[] = ['da', 'nbrg', 'nbrd','nbrs' ,'action'];
  cueillettes: Cueillette[] = [];
  constructor(public dialog: MatDialog, private cueilletteService: CueilletteService) {
  }

  ngOnInit(): void {
    this.fetchAll()
  }

  fetchAll() {
    this.cueilletteService.fetchAll().subscribe({
      next: (r) => {
        this.cueillettes = r.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      error: (err) => {
        console.log('Error while fetching sectors');
      }
    })
  }

  delete(id: string) {
    this.cueilletteService.delete(id).then(r => {
      this.fetchAll()
    })
  }

  update(cueillette: Cueillette) {
    const dialogRef = this.dialog.open(CueilletteDialogComponent, {
      width: '500px',
      data: cueillette
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CueilletteDialogComponent, {
      width: '500px',
    });
  }

}
