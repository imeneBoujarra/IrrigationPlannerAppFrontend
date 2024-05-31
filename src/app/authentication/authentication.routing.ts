import {Routes} from '@angular/router';

import {AppSideLoginComponent} from './login/login.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
      }
    ]
  },
];
