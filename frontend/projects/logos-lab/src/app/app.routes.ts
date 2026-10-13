import { Routes } from '@angular/router';
import { memberGuard } from './member-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: $localize`:@@home.title:Home - Logos Lab`,
    loadComponent: () => import('./pages/home/home-page').then((m) => m.HomePage),
  },
  {
    path: 'explore',
    title: $localize`:@@explore.pageTitle:Explore - Logos Lab`,
    loadComponent: () => import('./pages/explore/explore-page').then((m) => m.ExplorePage),
  },
  {
    path: 'articles/:slug',
    title: $localize`:@@article.routeTitle:Article - Logos Lab`,
    loadComponent: () => import('./pages/article/article-page').then((m) => m.ArticlePage),
  },
  {
    path: 'courses/:slug',
    title: $localize`:@@course.routeTitle:Course - Logos Lab`,
    loadComponent: () =>
      import('./pages/course-overview/course-overview-page').then((m) => m.CourseOverviewPage),
  },
  {
    path: 'collections/:slug',
    title: $localize`:@@collection.routeTitle:Collection - Logos Lab`,
    loadComponent: () => import('./pages/collection/collection-page').then((m) => m.CollectionPage),
  },
  {
    path: 'topics/:slug',
    title: $localize`:@@topic.routeTitle:Topic - Logos Lab`,
    loadComponent: () => import('./pages/topic/topic-page').then((m) => m.TopicPage),
  },
  {
    path: 'experts',
    title: $localize`:@@experts.pageTitle:Experts - Logos Lab`,
    loadComponent: () => import('./pages/experts/experts-page').then((m) => m.ExpertsPage),
  },
  {
    path: 'experts/:slug',
    title: $localize`:@@expert.routeTitle:Expert - Logos Lab`,
    loadComponent: () =>
      import('./pages/expert-profile/expert-profile-page').then((m) => m.ExpertProfilePage),
  },
  {
    path: 'search',
    title: $localize`:@@search.pageTitle:Search - Logos Lab`,
    loadComponent: () =>
      import('./pages/search-results/search-results-page').then((m) => m.SearchResultsPage),
  },
  {
    path: 'sign-in',
    title: $localize`:@@signIn.pageTitle:Sign in - Logos Lab`,
    data: { shell: { kind: 'focused', action: 'register' } },
    loadComponent: () => import('./pages/sign-in/sign-in-page').then((m) => m.SignInPage),
  },
  {
    path: 'sign-in/verify',
    title: $localize`:@@signInVerify.pageTitle:Two-step verification - Logos Lab`,
    data: { shell: { kind: 'focused', action: 'register' } },
    loadComponent: () =>
      import('./pages/sign-in-verify/sign-in-verify-page').then((m) => m.SignInVerifyPage),
  },
  {
    path: 'register',
    title: $localize`:@@register.pageTitle:Create account - Logos Lab`,
    data: { shell: { kind: 'focused', action: 'sign-in' } },
    loadComponent: () => import('./pages/register/register-page').then((m) => m.RegisterPage),
  },
  {
    path: 'forgot-password',
    title: $localize`:@@forgotPassword.pageTitle:Reset your password - Logos Lab`,
    data: { shell: { kind: 'focused', action: 'register' } },
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password-page').then((m) => m.ForgotPasswordPage),
  },
  {
    path: 'reset-password',
    title: $localize`:@@resetPassword.pageTitle:Choose a new password - Logos Lab`,
    data: { shell: { kind: 'focused', action: 'sign-in' } },
    loadComponent: () =>
      import('./pages/reset-password/reset-password-page').then((m) => m.ResetPasswordPage),
  },
  {
    path: 'verify-email',
    title: $localize`:@@verifyEmail.pageTitle:Verify your email - Logos Lab`,
    data: { shell: { kind: 'focused', action: 'sign-in' } },
    loadComponent: () =>
      import('./pages/verify-email/verify-email-page').then((m) => m.VerifyEmailPage),
  },
  {
    path: 'settings',
    canActivate: [memberGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'profile' },
      {
        path: 'profile',
        title: $localize`:@@settingsProfile.pageTitle:Profile settings - Logos Lab`,
        loadComponent: () =>
          import('./pages/settings-profile/settings-profile-page').then(
            (m) => m.SettingsProfilePage,
          ),
      },
    ],
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
