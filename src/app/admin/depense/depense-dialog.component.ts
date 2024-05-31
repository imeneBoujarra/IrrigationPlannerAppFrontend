import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Depense} from "./depense";
import {DepenseService} from "./depense.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-download-dialog',
  templateUrl: './depense-dialog.component.html',
})
export class DepenseDialogComponent {
  depenseForm = this.fb.group({
    cat: [this.data ? this.data.cat : '', [Validators.required,]],
    des: [this.data ? this.data.des : '', [Validators.required,]],
    mon: [this.data ? this.data.mon : '', [Validators.required,]],
    da: [this.data ? this.data.da : '', [Validators.required,]],
    
  })

  constructor(private fb: FormBuilder, private depenseService: DepenseService, public dialogRef: MatDialogRef<DepenseDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Depense) {}
  private depense(): Depense {
    return {
      ...new Depense(),
      id: this.data ? this.data.id : '',
      cat: this.depenseForm.get(['cat'])!.value,
      des: this.depenseForm.get(['des'])!.value,
      da: this.depenseForm.get(['da'])!.value,
      mon: this.depenseForm.get(['mon'])!.value,
    };
  }
  onSubmit() {
    if (this.depenseForm.valid) {
      const depense: Depense = this.depense()
      if (this.data && this.data.id) {
        // Update existing sector
        this.depenseService.update(this.data.id, depense).then(() => {
          this.dialogRef.close();
        });
      } else {
        // Create new sector
        this.depenseService.create(depense).then(() => {
          this.dialogRef.close();
        });
      }
    }
  }
}
