import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: () => {
      return 'home'
    },
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'cv',
    loadComponent: () => import('./pages/cv/cv.component').then(c => c.CvComponent)
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./pages/portfolio/portfolio.component').then(c => c.PortfolioComponent)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
