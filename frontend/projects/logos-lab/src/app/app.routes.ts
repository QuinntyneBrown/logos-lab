import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: $localize`:@@home.title:Home - Logos Lab`,
    loadComponent: () => import('./pages/home/home-page').then((m) => m.HomePage),
  },
  {
    path: 'sign-in',
    title: $localize`:@@signIn.pageTitle:Sign in - Logos Lab`,
    data: { shell: { kind: 'focused', action: 'register' } },
    loadComponent: () => import('./pages/sign-in/sign-in-page').then((m) => m.SignInPage),
  },
  {
    path: 'register',
    title: $localize`:@@register.pageTitle:Create account - Logos Lab`,
    data: { shell: { kind: 'focused', action: 'sign-in' } },
    loadComponent: () => import('./pages/register/register-page').then((m) => m.RegisterPage),
  },
  {
    path: '403',
    title: $localize`:@@forbidden.pageTitle:No access - Logos Lab`,
    loadComponent: () => import('./pages/forbidden/forbidden-page').then((m) => m.ForbiddenPage),
  },
  {
    path: '**',
    title: $localize`:@@notFound.pageTitle:Page not found - Logos Lab`,
    loadComponent: () => import('./pages/not-found/not-found-page').then((m) => m.NotFoundPage),
  },
];
