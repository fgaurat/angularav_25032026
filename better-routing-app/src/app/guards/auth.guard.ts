import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard fonctionnel : redirige vers /home si l'utilisateur n'est pas connecté.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  // Redirige vers l'accueil avec un query param pour info
  return router.createUrlTree(['/'], { queryParams: { authRequired: true } });
};
