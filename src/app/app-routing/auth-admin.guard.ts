import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const userData = localStorage.getItem('datalogin'); // mengecek apakah ada session data login
  const router = inject(Router); // Inject Router di sini
  if (userData) {
    return true; // akses dibolehkan
  } else {
    return router.navigate(['/autentication']);  // akses dibatasi
  }
};
