import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {VenteDialogComponent} from "./vente-dialog.component";
import {Vente} from "./vente";
import {VenteService} from "./vente.service";
@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html'
})
export class VenteComponent implements OnInit {
  displayedColumns: string[] = ['qte', 'pr', 'da','cam','frcam','frocam','action'];
  ventes: Vente[] = [];
  constructor(public dialog: MatDialog, private venteService: VenteService) {
  }

  ngOnInit(): void {
    this.fetchAll()
  }

  fetchAll() {
    this.venteService.fetchAll().subscribe({
      next: (r) => {
        this.ventes = r.map((e: any) => {
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
    this.venteService.delete(id).then(r => {
      this.fetchAll()
    })
  }

  update(vente: Vente) {
    const dialogRef = this.dialog.open(VenteDialogComponent, {
      width: '500px',
      data: vente
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(VenteDialogComponent, {
      width: '500px',
    });
  }

}
