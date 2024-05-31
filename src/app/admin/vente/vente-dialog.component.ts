import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Vente} from "./vente";
import {VenteService} from "./vente.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-download-dialog',
  templateUrl: './vente-dialog.component.html',
})
export class VenteDialogComponent {
  venteForm = this.fb.group({
    da: [this.data ? this.data.da : '', [Validators.required,]],
    cam: [this.data ? this.data.cam : '', [Validators.required,]],
    frcam: [this.data ? this.data.frcam : '', [Validators.required,]],
    frocam: [this.data ? this.data.frocam : '', [Validators.required,]],
    qte: [this.data ? this.data.qte : '', [Validators.required, Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
    pr: [this.data ? this.data.pr : '', [Validators.required, Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]]
  })

  constructor(private fb: FormBuilder, private venteService: VenteService, public dialogRef: MatDialogRef<VenteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Vente) {}
  private vente(): Vente {
    return {
      ...new Vente(),
      id: this.data ? this.data.id : '',
      qte: this.venteForm.get(['qte'])!.value,
      pr: this.venteForm.get(['pr'])!.value,
      da: this.venteForm.get(['da'])!.value,
      cam: this.venteForm.get(['cam'])!.value,
      frcam: this.venteForm.get(['frcam'])!.value,
      frocam: this.venteForm.get(['frocam'])!.value,
      

    };
  }
  onSubmit() {
    if (this.venteForm.valid) {
      const vente: Vente = this.vente()
      if (this.data && this.data.id) {
        // Update existing sector
        this.venteService.update(this.data.id, vente).then(() => {
          this.dialogRef.close();
        });
      } else {
        // Create new sector
        this.venteService.create(vente).then(() => {
          this.dialogRef.close();
        });
      }
    }
  }
}
