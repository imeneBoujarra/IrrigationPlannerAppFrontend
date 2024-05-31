import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { NgxTimepickerModule } from 'ngx-timepicker';
import { AdminRoutes } from './admin.routing';

import { ProductComponent } from "./product/product.component";
import { ProductDialogComponent } from "./product/product-dialog.component";
import { TreatmentComponent } from "./treatment/treatment.component";
import { TreatmentDialogComponent } from "./treatment/treatment-dialog.component";
import { SectorComponent } from "./sector/sector.component";
import { SectorDialogComponent } from "./sector/sector-dialog.component";
import { FarmerDialogComponent } from './farmer/farmer-dialog.component';
import { FarmerComponent } from './farmer/farmer.component';
import { PlanificationComponent } from './planification/planification.component';
import { PlanificationDialogComponent } from './planification/planification-dialog.component';
import { JournaliereComponent } from './journaliere/journaliere.component';
import { AddJournaliereComponent } from './Addjournaliere/add-journaliere.component';
import { TacheDialogComponent } from './tache/tache-dialog.component';
import { TacheComponent } from './tache/tache.component';

import { ProductAgrComponent } from './product-agr/product-agr.component';
import { ProductAgrDialogComponent } from './product-agr/productagr-dialog.component';
import { EntreComponent } from './entre/entre.component';
import { EntreDialogComponent } from './entre/entre-dialog.component';
import { DepenseComponent } from './depense/depense.component';
import { DepenseDialogComponent } from './depense/depense-dialog.component';
import { CueilletteComponent } from './cueillette/cueillette.component';
import { CueilletteDialogComponent } from './cueillette/cueillette-dialog.component';
import { VenteComponent } from './vente/vente.component';
import { VenteDialogComponent } from './vente/vente-dialog.component';
import { PersonelDialogComponent } from './personel/personel-dialog.component';
import { PersonelComponent } from './personel/personel.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    NgxTimepickerModule,
    MatFormFieldModule,
    MatDatepickerModule, // Assurez-vous que MatDatepickerModule est importé
    MatNativeDateModule, // Ass
   
  ],
  declarations: [
    SectorComponent,
    SectorDialogComponent,
    ProductComponent,
    ProductDialogComponent,
    TreatmentComponent,
    TreatmentDialogComponent,
    FarmerDialogComponent,
    FarmerComponent,
    PlanificationComponent,
    PlanificationDialogComponent,
    JournaliereComponent,
    AddJournaliereComponent,
TacheDialogComponent,
TacheComponent,
ProductAgrComponent,
ProductAgrDialogComponent,
EntreComponent,
EntreDialogComponent,
DepenseComponent,
DepenseDialogComponent,
CueilletteComponent,
CueilletteDialogComponent,
VenteDialogComponent,
VenteComponent,
PersonelDialogComponent,
PersonelComponent





  ],
})
export class AdminModule {
}
