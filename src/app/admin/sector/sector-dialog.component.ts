import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Sector} from "./sector";
import {SectorService} from "./sector.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-download-dialog',
  templateUrl: './sector-dialog.component.html',
})
export class SectorDialogComponent {
  sectorForm = this.fb.group({
    name: [this.data ? this.data.name : '', [Validators.required,]],
    size: [this.data ? this.data.size : '', [Validators.required, Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
    nbr: [this.data ? this.data.nbr : '', [Validators.required, Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]]
  })

  constructor(private fb: FormBuilder, private sectorService: SectorService, public dialogRef: MatDialogRef<SectorDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Sector) {}
  private sector(): Sector {
    return {
      ...new Sector(),
      id: this.data ? this.data.id : '',
      name: this.sectorForm.get(['name'])!.value,
      size: this.sectorForm.get(['size'])!.value,
      nbr: this.sectorForm.get(['nbr'])!.value,
    };
  }
  onSubmit() {
    if (this.sectorForm.valid) {
      const sector: Sector = this.sector()
      if (this.data && this.data.id) {
        // Update existing sector
        this.sectorService.update(this.data.id, sector).then(() => {
          this.dialogRef.close();
        });
      } else {
        // Create new sector
        this.sectorService.create(sector).then(() => {
          this.dialogRef.close();
        });
      }
    }
  }
}
