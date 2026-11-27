import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guard = (perfilExigido: 'admin' | 'cliente'): CanActivateFn => () => {
  const router = inject(Router);
  const perfil = sessionStorage.getItem('perfil');
  return perfil === perfilExigido ? true : router.createUrlTree(['/login']);
};