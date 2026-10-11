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
    path: '**',
    title: $localize`:@@notFound.pageTitle:Page not found - Logos Lab`,
    loadComponent: () => import('./pages/not-found/not-found-page').then((m) => m.NotFoundPage),
  },
];
