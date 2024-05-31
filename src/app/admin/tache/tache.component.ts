import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TacheDialogComponent} from "./tache-dialog.component";
import {Tache} from "./tache";
import {TacheService} from "./tache.service";
@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html'
})
export class TacheComponent implements OnInit {
  displayedColumns: string[] = ['name', 'ph', 'pf', 'action'];
  taches: Tache[] = [];
  constructor(public dialog: MatDialog, private tacheService: TacheService) {
  }

  ngOnInit(): void {
    this.fetchAll()
  }

  fetchAll() {
    this.tacheService.fetchAll().subscribe({
      next: (r) => {
        this.taches = r.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      error: (err) => {
        console.log('Error while fetching taches');
      }
    })
  }

  delete(id: string) {
    this.tacheService.delete(id).then(r => {
      this.fetchAll()
    })
  }

  update(tache: Tache) {
    const dialogRef = this.dialog.open(TacheDialogComponent, {
      width: '500px',
      data: tache
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(TacheDialogComponent, {
      width: '500px',
    });
  }

}
