import { Routes } from '@angular/router';

// ui
import { SectorComponent } from './sector/sector.component';
import { ProductComponent } from "./product/product.component";
import { TreatmentComponent } from "./treatment/treatment.component";
import { FarmerComponent } from './farmer/farmer.component';
import { PlanificationComponent } from './planification/planification.component';
import { JournaliereComponent } from './journaliere/journaliere.component';
import { AddJournaliereComponent } from './Addjournaliere/add-journaliere.component'
import { TacheComponent } from './tache/tache.component';


import { ProductAgrComponent } from './product-agr/product-agr.component';
import { EntreComponent } from './entre/entre.component';
import { DepenseComponent } from './depense/depense.component';
import { CueilletteComponent } from './cueillette/cueillette.component';
import { VenteComponent } from './vente/vente.component';
import { PersonelComponent } from './personel/personel.component';





export const AdminRoutes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'sector',
        component: SectorComponent,
      },
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'productagr',
        component: ProductAgrComponent,
      },
      {
        path: 'treatment',
        component: TreatmentComponent,
      },
     
      {
        path: 'farmer',
        component: FarmerComponent,
      },
      {
        path: 'planification',
        component: PlanificationComponent,
      },
      {
        path: 'journaliere/:id',
        component: JournaliereComponent,
      },
      {
        path: 'add-iregation',
        component: AddJournaliereComponent,
      },
      {
        path: 'tache',
        component: TacheComponent,
      },
     
      {
        path: 'entre',
        component: EntreComponent,
      },
      {
        path: 'depense',
        component: DepenseComponent,
      },
      {
        path: 'cueillette',
        component: CueilletteComponent,
      },
      {
        path: 'vente',
        component: VenteComponent,
      },
      {
        path: 'personel',
        component: PersonelComponent,
      },






    ],
  },
];
