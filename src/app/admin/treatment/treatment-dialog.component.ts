import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Treatment} from "./treatment";
import {TreatmentService} from "./treatment.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SectorService} from "../sector/sector.service";
import {Product} from "../product/product";
import { Sector } from '../sector/sector';

@Component({
  selector: 'app-download-dialog',
  templateUrl: './treatment-dialog.component.html',
})
export class TreatmentDialogComponent implements OnInit {
  products: Product[] = [];
  treatmentForm = this.fb.group({
    products: [this.data.treatment ? this.data.treatment.products : [], [Validators.required,]],
    start: [this.data.treatment ? this.data.treatment.start : '', [Validators.required,]],
    end: [this.data.treatment ? this.data.treatment.end : '', [Validators.required,]],
    qte: [this.data.treatment ? this.data.treatment.qte : '', [Validators.required,]],
    te: [this.data.treatment ? this.data.treatment.te : '', [Validators.required,]],
    se: [this.data.treatment ? this.data.treatment.se : '', [Validators.required,]],
  
    
  })


  constructor(private fb: FormBuilder, private treatmentService: TreatmentService, public dialogRef: MatDialogRef<TreatmentDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { treatment?: Treatment, products: Product[],sectors: Sector[] }, private sectorService: SectorService) {}

  ngOnInit(): void {
    this.products = this.data.products;
  }

  private treatment(): Treatment {
    return {
      ...new Treatment(),
      id: this.data.treatment ? this.data.treatment.id : '',
     
      products: this.treatmentForm.get(['products'])!.value,
      start: this.treatmentForm.get(['start'])!.value,
      end: this.treatmentForm.get(['end'])!.value,
      qte: this.treatmentForm.get(['qte'])!.value,
      se: this.treatmentForm.get(['se'])!.value,
      te: this.treatmentForm.get(['te'])!.value,
      

    
      


    };
  }
  onSubmit() {
    if (this.treatmentForm.valid) {
      const treatment: Treatment = this.treatment()
      if (this.data.treatment && this.data.treatment.id) {
        
        this.treatmentService.update(this.data.treatment.id, treatment).then(() => {
          this.dialogRef.close();
        });
      } else {
        
        this.treatmentService.create(treatment).then(() => {
          this.dialogRef.close();
        });
      }
    }
  }
}
