import { Component, OnInit } from '@angular/core';
import { SectorService } from "../sector/sector.service";
import { Sector } from "../sector/sector";
import { JournaliereService } from '../journaliere/journaliere.service';
import { PlanificationService } from '../planification/planification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Planification } from '../planification/planification';

@Component({
  selector: 'app-journaliere',
  templateUrl: './add-journaliere.component.html'
})
export class AddJournaliereComponent implements OnInit {
  planifications: Planification[] = [];
  sectors: Sector[] = [];
  AddJournaliere!: FormGroup;
  datenow = new Date();
  pageSize = 10; // Nombre d'éléments par page
  currentPage = 1; // Page actuelle
  showForm = false; // Condition to show/hide form

  constructor(
    private formBuilder: FormBuilder,
    private planificationService: PlanificationService,
    private sectorService: SectorService,
    private journaliereService: JournaliereService
  ) { }

  ngOnInit(): void {
    this.AddJournaliere = this.formBuilder.group({
      sector: [''],
      planificationId: [''],
      start: [''],
      hod: [''],
      hof: [''],
    });

    this.fetchTodaysIrrigationData();
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  fetchTodaysIrrigationData(): void {
    const today = this.formatDate(new Date());
    this.planificationService.fetchTodaysIrrigationData().subscribe({
      next: (r: any[]) => {
        this.planifications = r.filter(el => el.start === today);
        this.showForm = this.planifications.length > 0;
      },
      error: (err) => {
        console.log('Error while fetching planifications', err);
        this.showForm = false;
      }
    });
  }

  fetchSectors(ids: any): void {
    this.sectorService.getDocumentsByArrayField("id", ids).subscribe({
      next: (r: any[]) => {
        this.sectors = r;
      },
      error: (err) => {
        console.log('Error while fetching sectors', err);
      }
    });
  }

  getSectorName(id: string): string | undefined {
    const sector = this.sectors.find(s => s.id === id);
    return sector ? sector.name : undefined;
  }

  async addJournaliere(): Promise<void> {
    // Ajoutez ici l'implémentation pour ajouter une journalière
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }
}
