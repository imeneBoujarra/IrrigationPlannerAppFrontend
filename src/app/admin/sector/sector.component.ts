import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SectorDialogComponent} from "./sector-dialog.component";
import {Sector} from "./sector";
import {SectorService} from "./sector.service";
@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html'
})
export class SectorComponent implements OnInit {
  displayedColumns: string[] = ['name', 'size', 'nbr', 'action'];
  sectors: Sector[] = [];
  constructor(public dialog: MatDialog, private sectorService: SectorService) {
  }

  ngOnInit(): void {
    this.fetchAll()
  }

  fetchAll() {
    this.sectorService.fetchAll().subscribe({
      next: (r) => {
        this.sectors = r.map((e: any) => {
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
    this.sectorService.delete(id).then(r => {
      this.fetchAll()
    })
  }

  update(sector: Sector) {
    const dialogRef = this.dialog.open(SectorDialogComponent, {
      width: '500px',
      data: sector
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(SectorDialogComponent, {
      width: '500px',
    });
  }

}
