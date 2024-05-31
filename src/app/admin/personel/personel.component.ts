import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { TacheService } from "../tache/tache.service";
import { Tache } from "../tache/tache";
import { PersonelService } from './personel.service';
import { PersonelDialogComponent } from './personel-dialog.component';
import { Personel } from './personel';
import { Sector } from '../sector/sector';
import { SectorService } from '../sector/sector.service';

@Component({
  selector: 'app-personel',
  templateUrl: './personel.component.html'
})
export class PersonelComponent implements OnInit {
  displayedColumns: string[] = ['sector', 'tache', 'da', 'nbrf', 'nbrh', 'action'];
  personels: Personel[] = [];
  taches: Tache[] = [];
  sectors: Sector[] = [];
  totalFemaleAmount?: number;

  constructor(
    public dialog: MatDialog,
    private personelService: PersonelService,
    private tacheService: TacheService,
    private sectorService: SectorService
  ) {}

  ngOnInit(): void {
    this.fetchAll();
    this.fetchTaches();
    this.fetchSectors();
  }

  fetchAll() {
    this.personelService.fetchAll().subscribe({
      next: (r) => {
        this.personels = r.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
        console.log('Personels:', this.personels);  // Debugging log
        this.calculateTotalFemaleAmount(this.personels); // Calculate total female amount after fetching data
      },
      error: (err) => {
        console.log('Error while fetching personels', err);
      }
    });
  }

  fetchTaches() {
    this.tacheService.fetchAll().subscribe({
      next: (r) => {
        this.taches = r.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
        console.log('Taches:', this.taches);  // Debugging log
      },
      error: (err) => {
        console.log('Error while fetching taches', err);
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
        console.log('Sectors:', this.sectors);  // Debugging log
      },
      error: (err) => {
        console.log('Error while fetching sectors', err);
      }
    });
  }

  getTacheName(id: string): string | undefined {
    const tache = this.taches.find(s => s.id === id);
    return tache ? tache.name : undefined;
  }

  getSectorName(id: string): string | undefined {
    const sector = this.sectors.find(s => s.id === id);
    return sector ? sector.name : undefined;
  }

  delete(id: string) {
    this.personelService.delete(id).then(() => {
      this.fetchAll();
    });
  }

  update(personel: Personel) {
    const dialogRef = this.dialog.open(PersonelDialogComponent, {
      width: '500px',
      data: {
        personel,
        taches: this.taches,
        sectors: this.sectors
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchAll();
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(PersonelDialogComponent, {
      width: '500px',
      data: {
        taches: this.taches,
        sectors: this.sectors
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchAll();
    });
  }

  calculateTotalFemaleAmount(personels: Personel[]): void {
    let totalFemaleAmount = 0;
    personels.forEach(personel => {
      const tache = this.taches.find(t => t.id === personel.tache);
      if (tache && personel.nbrf !== undefined && tache.prf !== undefined) {
        totalFemaleAmount += tache.prf * personel.nbrf;
      }
    });
    this.totalFemaleAmount = totalFemaleAmount;
    console.log('Total Female Amount:', this.totalFemaleAmount);  // Debugging log
  }

  calculateMontant(personel: Personel): void {
    const tache = this.taches.find(t => t.id === personel.tache);
    if (tache) {
      const prh = Number(tache.ph) || 0; // Utiliser ph pour le tarif horaire
      const prf = Number(tache.pf) || 0; // Utiliser pf pour le tarif féminin
      const nbrh = Number(personel.nbrh) || 0;
      const nbrf = Number(personel.nbrf) || 0;
  
      const montant = (prh * nbrh) + (prf * nbrf);
      console.log('Montant:', montant);
      alert(`Montant: ${montant}`);
    } else {
      alert('Tâche non trouvée');
    }
  }}