export const CONTEXT_MENU = [
  {
    route: 'default',
    items: []
  },
  {
    route: '/layout/o/home',
    items: [
      { name: 'home', path: '/layout/o/home' },
    ]
  },
  {
    route: '/layout/o/organization/view',
    items: [
      { name: 'informations', path: '/layout/o/organization/view'},
      { name: 'members', path: ''},
      { name: 'administration', path: ''},
      { name: 'activity report', path: '/layout/o/organization/activityreports'},
      { name: 'dapps', path: ''}
    ]
  },
  {
    route: '/layout/o/organization/activityreports',
    items: [
      { name: 'informations', path: '/layout/o/organization/view'},
      { name: 'members', path: ''},
      { name: 'administration', path: ''},
      { name: 'activity report', path: '/layout/o/organization/activityreports'},
      { name: 'dapps', path: ''}
    ]
  },
  {
    route: '/layout/o/delivery',
    items: [
      { name: 'home', path: '/layout/o/delivery'},
      { name: 'templates', path: '/layout/o/delivery/template/list'}
    ]
  },
  {
    route: '/layout/o/delivery/template/list',
    items: [
      { name: 'home', path: '/layout/o/delivery'},
      { name: 'templates', path: '/layout/o/delivery/template/list'}
    ]
  }
];
