import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/authentification.service';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated;


  isAuthenticated.subscribe((authenticated) => {
    if (!authenticated) {
      router.navigate(['/login']);
    }
  });

  return isAuthenticated; 

};
