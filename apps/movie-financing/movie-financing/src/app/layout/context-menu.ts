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
  }
];
