import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { SectorService } from "../sector/sector.service";
import { Sector } from "../sector/sector";
import { PlanificationService } from './planification.service';
import { PlanificationDialogComponent } from './planification-dialog.component';
import { Planification } from './planification';

@Component({
  selector: 'app-sector',
  templateUrl: './planification.component.html'
})
export class PlanificationComponent implements OnInit {
  displayedColumns: string[] = ['sector', 'start', 'end', 'hod', 'hof','action'];
  planifications: Planification[] = [];
  sectors: Sector[] = [];
  

  constructor(
    public dialog: MatDialog,
    private planificationService: PlanificationService,
    private sectorService: SectorService
  ) {}

  ngOnInit(): void {
    this.fetchAll();
    this.fetchSectors();
  }

  fetchAll() {
    this.planificationService.fetchAll().subscribe({
      next: (r) => {
        this.planifications = r.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      error: (err) => {
        console.log('Error while fetching planifications');
      }
    });
  }

  fetchSectors() {
    this.sectorService.fetchAll().subscribe({
      next: (r) => {
        this.sectors = r.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      error: (err) => {
        console.log('Error while fetching sectors');
      }
    });
  }

  getSectorName(id: string): string | undefined {
    const sector = this.sectors.find(s => s.id === id);
    return sector ? sector.name : undefined;
  }

  delete(id: string) {
    this.planificationService.delete(id).then(() => {
      this.fetchAll();
    });
  }

  update(planification: Planification) {
    const dialogRef = this.dialog.open(PlanificationDialogComponent, {
      width: '500px',
      data: {
        planification,
        sectors: this.sectors
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(PlanificationDialogComponent, {
      width: '500px',
      data: {
        sectors: this.sectors
      }
    });
  }


  
  
}
