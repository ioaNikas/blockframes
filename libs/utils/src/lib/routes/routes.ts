// Routes
export const authRoutes = [
  {
    path: '',
    redirectTo: 'layout',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('@blockframes/auth').then(m => m.AuthModule)
  }
];

export const errorRoutes = [
  {
    path: 'not-found',
    loadChildren: () => import('@blockframes/ui').then(m => m.ErrorNotFoundModule)
  },
  {
    path: '**',
    loadChildren: () => import('@blockframes/ui').then(m => m.ErrorNotFoundModule)
  }
];

export const commonRoutes = [
  {
    path: 'account',
    loadChildren: () => import('@blockframes/account').then(m => m.AccountModule)
  },
  {
    path: 'organization',
    loadChildren: () => import('@blockframes/organization').then(m => m.OrganizationModule)
  }
];
