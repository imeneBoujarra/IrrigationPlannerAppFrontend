import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Tache } from "../tache/tache";
import { TacheService } from "../tache/tache.service";
import { PersonelService } from './personel.service';
import { Personel } from './personel';
import { Sector } from '../sector/sector';
import { SectorService } from '../sector/sector.service';

@Component({
  selector: 'app-personel-dialog',
  templateUrl: './personel-dialog.component.html',
})
export class PersonelDialogComponent implements OnInit {
  taches: Tache[] = [];
  sectors: Sector[] = [];
  personelForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private personelService: PersonelService,
    public dialogRef: MatDialogRef<PersonelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { personel?: Personel, taches: Tache[], sectors?: Sector[] },
    private tacheService: TacheService,
    private sectorService: SectorService
  ) {
    this.personelForm = this.fb.group({
      nbrh: [this.data.personel ? this.data.personel.nbrh : '', [Validators.required]],
      nbrf: [this.data.personel ? this.data.personel.nbrf : '', [Validators.required]],
      tache: [this.data.personel ? this.data.personel.tache : '', [Validators.required]],
      sector: [this.data.personel ? this.data.personel.sector : '', [Validators.required]],
      da: [this.data.personel ? this.data.personel.da : '', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.taches = this.data.taches || [];
    this.sectors = this.data.sectors || [];
    this.fetchSectors();
  }

  private fetchSectors(): void {
    this.sectorService.fetchAll().subscribe({
      next: (r) => {
        this.sectors = r.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      error: (err) => {
        console.log('Error while fetching sectors', err);
      }
    });
  }

  private createPersonel(): Personel {
    return {
      ...new Personel(),
      id: this.data.personel ? this.data.personel.id : '',
      nbrh: this.personelForm.get('nbrh')?.value,
      nbrf: this.personelForm.get('nbrf')?.value,
      da: this.personelForm.get('da')?.value,
      tache: this.personelForm.get('tache')?.value,
      sector: this.personelForm.get('sector')?.value,
    };
  }

  onSubmit() {
    if (this.personelForm.valid) {
      const personel: Personel = this.createPersonel();
      if (this.data.personel && this.data.personel.id) {
        // Update existing personel
        this.personelService.update(this.data.personel.id, personel).then(() => {
          this.dialogRef.close();
        });
      } else {
        // Create new personel
        this.personelService.create(personel).then(() => {
          this.dialogRef.close();
        });
      }
    }
  }
}
