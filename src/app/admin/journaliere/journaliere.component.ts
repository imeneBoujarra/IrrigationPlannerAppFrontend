import { Component, OnInit } from '@angular/core';
import { SectorService } from "../sector/sector.service";
import { Sector } from "../sector/sector";
import { JournaliereService } from './journaliere.service';

import { Journaliere } from './journaliere';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sector',
  templateUrl: './journaliere.component.html'
})
export class JournaliereComponent implements OnInit {
  displayedColumns: string[] = ['sector', 'hof', 'hod', 'da', 'va', 'action'];
  planifications: Journaliere[] = [];
  sectors: Sector[] = [];
  journaliereService: any;
  journaliers: any[] = [];
  pageSize = 10; // Nombre d'éléments par page
  currentPage = 1; // Page actuelle
  constructor(
    private route: ActivatedRoute,
    private planificationService: JournaliereService,
    private sectorService: SectorService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log(id)
      this.planificationService.fetchDataBySecteur("irrigations", id).subscribe({
        next: (r: any[]) => {

          this.planifications = r;
          this.journaliers = r;
          console.log("r", r)
          console.log("journaliers", this.journaliers)
          this.pagedDataArray();
        },
        error: () => {
          console.log('Error while fetching planifications');
        }
      });
    });
    this.fetchAll();
    this.fetchSectors();
    // this.loadTodaysIrrigationData();
  }
  get totalPages(): number {
    return Math.ceil(this.journaliers.length / this.pageSize);
  }
  fetchAll() {
    this.planificationService.fetchAll().subscribe({
      next: (r: any[]) => {
        console.log("my r", r)

      },
      error: () => {
        console.log('Error while fetching planifications');
      }
    });
  }
  get pages(): number[] {
    const pagesArray: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }

  pagedDataArray(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.journaliers.slice(startIndex, endIndex);
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
    console.log(this.sectors, id)
    const sector = this.sectors.find(s => s.id === id);
    return sector ? sector.name : undefined;
  }
  loadTodaysIrrigationData() {
    this.journaliereService.fetchTodaysIrrigationData().subscribe({
      next: (data: Journaliere[]) => {
        this.journaliers = data;
      },
      error: () => {
        console.log('Error while fetching today\'s irrigation data');
      }
    });
  }

  length(obj: any) {
    console.log(obj)
  }

  // Fonction pour passer à la page suivante
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Fonction pour passer à la page précédente
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Fonction pour aller à une page spécifique
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

}





