import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authAdminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userDataString = localStorage.getItem('datalogin'); // mengecek apakah ada session data login
  const router = inject(Router); // Inject Router di sini

  const currentUrl = state.url;
  const userData = JSON.parse(localStorage.getItem('datalogin') || '[]');
  const role = userData[0]?.role;


  // SUPER_ADMIN bebas akses semua
  if (role === 'SUPER_ADMIN') {
    return true;
  }

  


  // KITCHEN_ADMIN hanya boleh akses prefix tertentu
  if (role === 'KITCHEN_ADMIN') {
    const allowedExactPaths = ['/admin']; // hanya untuk dashboard/home
    const allowedPrefixPaths = ['/admin/history', '/admin/table','/kitchen', '/admin/settings'];

    const allowed = allowedExactPaths.includes(currentUrl) || allowedPrefixPaths.some(path => currentUrl.startsWith(path));
    if (allowed) {
      return true;
    } else {
      return router.navigate(['/admin']);
    }
  }

  // Cassier_ADMIN hanya boleh akses prefix tertentu
  if (role === 'CASSIER_ADMIN') {
    const allowedExactPaths = ['/admin']; // hanya untuk dashboard/home
    const allowedPrefixPaths = ['/admin/history', '/admin/table','/post', '/admin/cassier-admin', '/admin/settings'];

    const allowed = allowedExactPaths.includes(currentUrl) || allowedPrefixPaths.some(path => currentUrl.startsWith(path));
    if (allowed) {
      return true;
    } else {
      return router.navigate(['/admin']);
    }
  }

  

  // Role lain (atau undefined) langsung redirect
  return router.navigate(['/autentication']);
};
