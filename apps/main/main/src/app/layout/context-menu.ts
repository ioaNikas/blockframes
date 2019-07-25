export const CONTEXT_MENU = [
  {
    route: 'default',
    items: []
  },
  // Dapps home menus
  {
    route: '/layout/o/home',
    items: [{ name: 'home', path: '/layout/o/home' }]
  },
  // User profile menus
  {
    route: '/layout/o/account/profile/edit',
    items: [
      { name: 'profil', path: '/layout/o/account/profile/edit' },
      { name: 'wallet', path: '/layout/o/account/wallet/add' }
    ]
  },
  {
    route: '/layout/o/account/wallet/add',
    items: [
      { name: 'profil', path: '/layout/o/account/profile/edit' },
      { name: 'wallet', path: '/layout/o/account/wallet/add' }
    ]
  },
  // Organization profile menus
  {
    route: '/layout/o/organization/edit',
    items: [
      { name: 'informations', path: '/layout/o/organization/edit' },
      { name: 'members', path: '' },
      { name: 'administration', path: '/layout/o/organization/administration' },
      { name: 'activity report', path: '/layout/o/organization/activityreport' },
      { name: 'dapps', path: '' }
    ]
  },
  {
    route: '/layout/o/organization/activityreport',
    items: [
      { name: 'informations', path: '/layout/o/organization/edit' },
      { name: 'members', path: '' },
      { name: 'administration', path: '/layout/o/organization/administration' },
      { name: 'activity report', path: '/layout/o/organization/activityreport' },
      { name: 'dapps', path: '' }
    ]
  },
  {
    route: '/layout/o/organization/administration',
    items: [
      { name: 'informations', path: '/layout/o/organization/edit' },
      { name: 'members', path: '' },
      { name: 'administration', path: '/layout/o/organization/administration' },
      { name: 'activity report', path: '/layout/o/organization/activityreport' },
      { name: 'dapps', path: '' }
    ]
  },
  // Media delivering application menus
  {
    route: '/layout/o/delivery',
    items: [
      { name: 'home', path: '/layout/o/delivery' },
      { name: 'templates', path: '/layout/o/delivery/template/list' }
    ]
  },
  {
    route: '/layout/o/delivery/template/list',
    items: [
      { name: 'home', path: '/layout/o/delivery' },
      { name: 'templates', path: '/layout/o/delivery/template/list' }
    ]
  },
  {
    route: '/layout/o/delivery/template/:templateId',
    items: [
      { name: 'home', path: '/layout/o/delivery' },
      { name: 'templates', path: '/layout/o/delivery/template/list' },
      { name: 'edit', path: '/layout/o/delivery/template/:templateId' }
    ]
  },
  {
    route: '/layout/o/delivery/:movieId/list',
    items: [
      { name: 'home', path: '/layout/o/delivery' },
      { name: 'deliveries', path: '/layout/o/delivery/:movieId/list' },
      { name: 'movie materials', path: '/layout/o/delivery/:movieId/movie-materials' }
    ]
  },
  {
    route: '/layout/o/delivery/:movieId/movie-materials',
    items: [
      { name: 'home', path: '/layout/o/delivery' },
      { name: 'deliveries', path: '/layout/o/delivery/:movieId/list' },
      { name: 'movie materials', path: '/layout/o/delivery/:movieId/movie-materials' }
    ]
  },
  {
    route: '/layout/o/delivery/:movieId/create',
    items: [
      { name: 'home', path: '/layout/o/delivery' },
      { name: 'movie materials', path: '/layout/o/delivery/:movieId/movie-materials' }
    ]
  },
  {
    route: '/layout/o/delivery/:movieId/:deliveryId/settings',
    items: [
      { name: 'deliveries', path: '/layout/o/delivery/:movieId/list' },
      { name: 'settings', path: '/layout/o/delivery/:movieId/:deliveryId/settings' },
      { name: 'teamwork', path: '/layout/o/delivery/:movieId/:deliveryId/teamwork' },
      { name: 'edit', path: '/layout/o/delivery/:movieId/:deliveryId/edit' },
      { name: 'view', path: '/layout/o/delivery/:movieId/:deliveryId/view' }
    ]
  },
  {
    route: '/layout/o/delivery/:movieId/:deliveryId/teamwork',
    items: [
      { name: 'deliveries', path: '/layout/o/delivery/:movieId/list' },
      { name: 'settings', path: '/layout/o/delivery/:movieId/:deliveryId/settings' },
      { name: 'teamwork', path: '/layout/o/delivery/:movieId/:deliveryId/teamwork' },
      { name: 'edit', path: '/layout/o/delivery/:movieId/:deliveryId/edit' },
      { name: 'view', path: '/layout/o/delivery/:movieId/:deliveryId/view' }
    ]
  },
  {
    route: '/layout/o/delivery/:movieId/:deliveryId/edit',
    items: [
      { name: 'deliveries', path: '/layout/o/delivery/:movieId/list' },
      { name: 'settings', path: '/layout/o/delivery/:movieId/:deliveryId/settings' },
      { name: 'teamwork', path: '/layout/o/delivery/:movieId/:deliveryId/teamwork' },
      { name: 'edit', path: '/layout/o/delivery/:movieId/:deliveryId/edit' },
      { name: 'view', path: '/layout/o/delivery/:movieId/:deliveryId/view' }
    ]
  },
  {
    route: '/layout/o/delivery/:movieId/:deliveryId/view',
    items: [
      { name: 'deliveries', path: '/layout/o/delivery/:movieId/list' },
      { name: 'settings', path: '/layout/o/delivery/:movieId/:deliveryId/settings' },
      { name: 'teamwork', path: '/layout/o/delivery/:movieId/:deliveryId/teamwork' },
      { name: 'edit', path: '/layout/o/delivery/:movieId/:deliveryId/edit' },
      { name: 'view', path: '/layout/o/delivery/:movieId/:deliveryId/view' }
    ]
  }
];
