import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Entre } from "./entre";
import { EntreService } from "./entre.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-entre-dialog',
  templateUrl: './entre-dialog.component.html',
})
export class EntreDialogComponent {
  entreForm = this.fb.group({
    cat: [this.data ? this.data.cat : '', [Validators.required]],
    des: [this.data ? this.data.des : '', [Validators.required]],
    no: [this.data ? this.data.no : '', [Validators.required]],
    da: [this.data ? this.data.da ? this.data.da.toISOString().split('T')[0] : '' : '', [Validators.required]],
    image: [null as null | undefined | string]
  });

  constructor(
    private fb: FormBuilder,
    private entreService: EntreService,
    public dialogRef: MatDialogRef<EntreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Entre,
    private storage: AngularFireStorage
  ) {}

  private entre(): Entre {
    const daValue = this.entreForm.get('da')!.value;
    return {
      ...new Entre(),
      id: this.data ? this.data.id : '',
      cat: this.entreForm.get('cat')!.value ?? undefined,
      des: this.entreForm.get('des')!.value ?? undefined,
      da: daValue ? new Date(daValue) : undefined,
      no: this.entreForm.get('no')!.value ?? undefined,
      image: this.entreForm.get('image')!.value ?? undefined
    };
  }

  onSubmit() {
    if (this.entreForm.valid) {
      const entre: Entre = this.entre();
      if (this.data && this.data.id) {
        this.entreService.update(this.data.id, entre).then(() => {
          this.dialogRef.close();
        });
      } else {
        this.entreService.create(entre).then(() => {
          this.dialogRef.close();
        });
      }
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const storageRef = ref(this.storage.storage, 'Uploads/' + file.name);
      uploadBytes(storageRef, file).then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          this.entreForm.patchValue({ image: url });
        });
      });
    }
  }
}
