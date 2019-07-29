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

  // Movie Financing menus

  {
    route: '/layout/home/form/:movieId',
    items: [
      { name: 'explorer', path: '/explorer' },
      { name: 'see in explorer', path: '/explorer/movie/:movieId' },
      { name: 'dashboard', path: '/layout/:movieId/dashboard' }
    ]
  },
  {
    route: '/layout/home/form/:movieId',
    items: [
      { name: 'edit film', path: '/layout/home/form/:movieId', exact:true },
      { name: 'see in explorer', path: '/explorer/movie/:movieId' },
      { name: 'dashboard', path: '/layout/:movieId/dashboard'}
    ]
  },
  {
    route: '/layout/:movieId/dashboard',
    items: [
      { name: 'edit film', path: '/layout/home/form/:movieId' },
      { name: 'see in explorer', path: '/explorer/movie/:movieId' },
      { name: 'dashboard', path: '/layout/:movieId/dashboard', exact:true },
      { name: 'management', path: '/layout/:movieId/management' }
    ]
  },
  {
    route: '/layout/:movieId/management',
    items: [
      { name: 'edit film', path: '/layout/home/form/:movieId' },
      { name: 'see in explorer', path: '/explorer/movie/:movieId' },
      { name: 'dashboard', path: '/layout/:movieId/dashboard' },
      { name: 'management', path: '/layout/:movieId/management', exact:true }
    ]
  }
];
