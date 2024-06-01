import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sector } from '../sector/sector';
import { SectorService } from '../sector/sector.service';
import { PlanificationService } from './planification.service';
import { Planification } from './planification';
import { Heure } from '../heure';
import { dateLessThan } from '../date-validators';
import { Irrigation } from '../journaliere/irrigation';
import { JournaliereService } from '../journaliere/journaliere.service';
import { Timestamp } from 'firebase/firestore';
import { timestamp } from 'rxjs';


@Component({
  selector: 'app-download-dialog',
  templateUrl: './planification-dialog.component.html',
})
export class PlanificationDialogComponent implements OnInit {
  hof: Heure = new Heure(10, 30, 0);
  sectors: Sector[] = [];
  
  // Apply the custom validator to the form
  planificationForm = this.fb.group({
    sector: [this.data.planification ? this.data.planification.sector : '', [Validators.required]],
    start: [this.data.planification ? this.data.planification.start : '', [Validators.required,  Validators.min(this.getMinDate())]],
    end: [this.data.planification ? this.data.planification.end : '', [Validators.required,  Validators.min(this.getMinDate())]],
    hof: [this.data.planification ? this.data.planification.hof : '', [Validators.required]],
    hod: [this.data.planification ? this.data.planification.hod : '', [Validators.required]],
  }, { validator: dateLessThan('start', 'end') });

  constructor(
    private fb: FormBuilder,
    private planificationService: PlanificationService,
    public dialogRef: MatDialogRef<PlanificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { planification?: Planification, sectors: Sector[] },
    private irrigationService : JournaliereService
  ) { }

  ngOnInit(): void {
    this.sectors = this.data.sectors;
   
  }

  private generateIrrigations(  farmerId :string , planification :string , start: Date, end: Date, sector: string) {
    let currentDate = new Date(start);
    let endDate = new Date(end);
    while (currentDate <= endDate) {
      this.irrigationService.create(this.irrigationGet(sector , currentDate,farmerId ,planification  ))
      currentDate.setDate(currentDate.getDate() + 1);
    }
 
  }

  getMinDate(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
    return today.getTime(); // Get today's date as a numeric timestamp
  }

  private planification(): Planification {
    const sector = this.planificationForm.get('sector')!.value;
    const start = this.planificationForm.get('start')!.value;
    const end = this.planificationForm.get('end')!.value;
 

    return {
      ...new Planification(),
      id: this.data.planification ? this.data.planification.id : '',
      sector: sector,
      start: start,
      end: end,
      hod: this.planificationForm.get('hod')!.value,
      hof: this.planificationForm.get('hof')!.value,
   
    };
  }

  private irrigationGet(sector : any , start :any , farmerId :any ,planificationId:any) :Irrigation
  {
    return {
      ...new Irrigation(),
      id: '',
      sector: sector,
      date: start,
      hod: this.planificationForm.get('hod')!.value,
      hof: this.planificationForm.get('hof')!.value,
      state:false,
      farmerId:farmerId,
      planificationId:planificationId,
   
    };
  }




  onSubmit() {
    if (this.planificationForm.valid) {
      const sector: Planification = this.planification();
      if (this.data.planification && this.data.planification.id) {
        // Update existing sector
        this.planificationService.update(this.data.planification.id, sector).then(() => {
        this.dialogRef.close();
        });
      } else {
        // Create new sector
     
        this.planificationService.create(sector).then(() => {
          // Generate irrigations after creating the planification
          const { start, end} = sector;
          const userId = localStorage.getItem('uiiduser') ;
          if (userId != null )
            {
                this.generateIrrigations( userId, sector.id!, start!, end!, sector.sector!)
                this.dialogRef.close();
       
            }
          else {
            console.log ("can't fetch uId from localStrage");
          }
          
          
          });
    

      }
    }
  }
}
