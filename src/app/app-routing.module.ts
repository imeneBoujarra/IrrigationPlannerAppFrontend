import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlankComponent} from './layouts/blank/blank.component';
import {FullComponent} from './layouts/full/full.component';
import {authGuard} from "./guards/auth.guard";


const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/admin/farmer',
        pathMatch: 'full',
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then(
            (m) => m.AdminModule
          ),
        canActivate: [authGuard],
      },
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
