import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Cueillette} from "./cueillette";
import {CueilletteService} from "./cueillette.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-download-dialog',
  templateUrl: './cueillette-dialog.component.html',
})
export class CueilletteDialogComponent {
  cueilletteForm = this.fb.group({
    da: [this.data ? this.data.da : '', [Validators.required]],
    nbrs: [this.data ? this.data.nbrs : '', [Validators.required, Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
    nbrd: [this.data ? this.data.nbrd: '', [Validators.required, Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
    nbrg: [this.data ? this.data.nbrg : '', [Validators.required, Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]]
  })

  constructor(private fb: FormBuilder, private cueilletteService: CueilletteService, public dialogRef: MatDialogRef<CueilletteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Cueillette) {}
  private cueillette(): Cueillette {
    return {
      ...new Cueillette(),
      id: this.data ? this.data.id : '',
      da: this.cueilletteForm.get(['da'])!.value,
      nbrg: this.cueilletteForm.get(['nbrg'])!.value,
      nbrs: this.cueilletteForm.get(['nbrs'])!.value,
      nbrd: this.cueilletteForm.get(['nbrd'])!.value,
    };
  }
  onSubmit() {
    if (this.cueilletteForm.valid) {
      const cueillette: Cueillette = this.cueillette()
      if (this.data && this.data.id) {
        // Update existing sector
        this.cueilletteService.update(this.data.id, cueillette).then(() => {
          this.dialogRef.close();
        });
      } else {
        // Create new sector
        this.cueilletteService.create(cueillette).then(() => {
          this.dialogRef.close();
        });
      }
    }
  }
}
