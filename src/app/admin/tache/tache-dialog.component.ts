import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Tache} from "./tache";
import {TacheService} from "./tache.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-download-dialog',
  templateUrl: './tache-dialog.component.html',
})
export class TacheDialogComponent {
  tacheForm = this.fb.group({
    name: [this.data ? this.data.name : '', [Validators.required,]],
    pf: [this.data ? this.data.pf : '', [Validators.required, Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
    ph: [this.data ? this.data.ph : '', [Validators.required, Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]]
    
  })
  

  constructor(private fb: FormBuilder, private tacheService: TacheService, public dialogRef: MatDialogRef<TacheDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Tache) {}
  private tache(): Tache {
    return {
      ...new Tache(),
      id: this.data ? this.data.id : '',
      name: this.tacheForm.get(['name'])!.value,
      ph: this.tacheForm.get(['ph'])!.value,
      pf: this.tacheForm.get(['pf'])!.value,
    };
  }
  onSubmit() {
    if (this.tacheForm.valid) {
      const tache: Tache = this.tache()
      if (this.data && this.data.id) {
       
        this.tacheService.update(this.data.id, tache).then(() => {
          this.dialogRef.close();
        });
      } else {
        // Create new sector
        this.tacheService.create(tache).then(() => {
          this.dialogRef.close();
        });
      }
    }
  }
 
}
