import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { EntreDialogComponent } from "./entre-dialog.component";
import { Entre } from "./entre";
import { EntreService } from "./entre.service";

@Component({
  selector: 'app-entre',
  templateUrl: './entre.component.html',
})
export class EntreComponent implements OnInit {
  displayedColumns: string[] = ['no', 'da', 'des', 'cat', 'image', 'action'];
  entres: Entre[] = [];

  constructor(public dialog: MatDialog, private entreService: EntreService) {}

  ngOnInit(): void {
    this.fetchAll();
  }

  openFullImage(imageUrl: string) {
    window.open(imageUrl);
  }

  fetchAll() {
    this.entreService.fetchAll().subscribe({
      next: (r) => {
        this.entres = r.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          if (data.da && data.da.toDate) {
            data.da = data.da.toDate();
          }
          return data;
        });
      },
      error: (err) => {
        console.log('Error while fetching entries/sorties', err);
      }
    });
  }

  delete(id: string) {
    this.entreService.delete(id).then(() => {
      this.fetchAll();
    });
  }

  update(entre: Entre) {
    const dialogRef = this.dialog.open(EntreDialogComponent, {
      width: '500px',
      data: entre
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchAll();
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(EntreDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchAll();
    });
  }
}
