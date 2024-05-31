import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map, take} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AngularFireAuth)
  const router = inject(Router)
  return auth.authState.pipe(
    take(1),
    map((user) => {
      const isAuthenticated = !!user;
      if (!isAuthenticated) {
        router.navigate(['/authentication/login']);
      }
      return isAuthenticated;
    })
  );
};
