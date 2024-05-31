import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Farmer} from "./farmer";
import {FarmerService} from "./farmer.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-farmer-dialog',
  templateUrl: './farmer-dialog.component.html',
})
export class FarmerDialogComponent {
  farmerForm = this.fb.group({
    fName: [this.data ? this.data.fName : '', [Validators.required,]],
    lName: [this.data ? this.data.lName : '', [Validators.required,]],
    phone: [this.data ? this.data.phone : '', [Validators.required,]],
    email: [this.data ? this.data.email : '', [Validators.required, Validators.email]],
    password: ['', [Validators.required,]],
    })

  constructor(private fb: FormBuilder, private farmerService: FarmerService, public dialogRef: MatDialogRef<FarmerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Farmer) {}
  private farmer(): Farmer {
    return {
      ...new Farmer(),
      id: this.data ? this.data.id : '',
      fName: this.farmerForm.get(['fName'])!.value,
      lName: this.farmerForm.get(['lName'])!.value,
      email: this.farmerForm.get(['email'])!.value,
      password: this.farmerForm.get(['password'])!.value,
      phone: this.farmerForm.get(['phone'])!.value,
    };
  }
  onSubmit() {
    if (this.farmerForm.valid) {
      const farmer: Farmer = this.farmer()
      /*if (this.data && this.data.id) {
        // Update existing farmer
        this.farmerService.update(this.data.id, farmer).then(() => {
          this.dialogRef.close();
        });
      } else {*/
        if (farmer) {
          // Create new farmer
          this.farmerService.create(farmer).then(() => {
            this.dialogRef.close();
          });
        }
      /*}*/
    }
  }
}
