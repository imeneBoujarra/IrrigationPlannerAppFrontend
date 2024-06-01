import { Component, OnInit } from '@angular/core';
import { SectorService } from "../sector/sector.service";
import { Sector } from "../sector/sector";
import { JournaliereService } from './journaliere.service';

import { Irrigation } from './irrigation';
import { ActivatedRoute } from '@angular/router';
import { PlanificationService } from '../planification/planification.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sector',
  templateUrl: './journaliere.component.html'
})
export class JournaliereComponent implements OnInit {
  displayedColumns: string[] = ['sector', 'hof', 'hod', 'da', 'va', 'action'];
  planifications: Irrigation[] = [];
  sectors: Sector[] = [];
  journaliereService: any;
  journaliers: any[] = [];
  planification :any 
  role : any ; 
  pageSize = 10; // Nombre d'éléments par page
  currentPage = 1; // Page actuelle
  constructor(
    private route: ActivatedRoute,
    private planificationService: PlanificationService,
    private sectorService: SectorService,
    private journalierService : JournaliereService,
    private authService : AuthService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.setRole();
      this.planificationService.fetchTodaysIrrigationData().subscribe({
        next: (planification: any[]) => {
          this.planification = planification[0] ;
          this.fetchAll(planification[0].id);
          this.pagedDataArray();

        },
        error: () => {
          console.log('Error while fetching planifications');
        }
      });
    });
   
    this.fetchSectors();
    // this.loadTodaysIrrigationData();
  }
  get totalPages(): number {
    return Math.ceil(this.journaliers.length / this.pageSize);
  }




  fetchAll(id :any ) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.journalierService.fetchTodaysIrrigationData( id).subscribe({
      next: (r: any[]) => {
        if (this.role)
        {
          this.journaliers = r ; 
        }
        else {
          this.journaliers = r.filter(item => {
            const itemDate = (item.date.seconds ? new Date(item.date.seconds * 1000) : item.date) as Date; // Convert Firestore Timestamp to Date
            itemDate.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
            return itemDate <= today;
          });

        }

        console.log("journalier" , r)
          

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

  setRole() {
    const role = localStorage.getItem('role');
    this.role = role === 'admin';
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

  validateIrrigation(item: any): void {
    item.state = true;
    this.journalierService.updateIrrigation(item._id , item);
  }
    
  getSectorName(id: string): string | undefined {
    const sector = this.sectors.find(s => s.id === id);
    return sector ? sector.name : undefined;
  }


  loadTodaysIrrigationData() {
    this.journaliereService.fetchTodaysIrrigationData().subscribe({
      next: (data: Irrigation[]) => {
        this.journaliers = data;
      },
      error: () => {
        console.log('Error while fetching today\'s irrigation data');
      }
    });
  }

  length(obj: any) {

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





