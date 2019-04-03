export const CONTEXT_MENU = [
  {route: 'default', items: [
    {name: 'explorer', path: '/layout/home'},
    {name: 'example', path: '/layout/account/profile'},
  ]},
  {route: '/layout/:id', items: [
    {name: 'explorer', path: '/layout/home', exact: true},
    {name: 'view', path: '/layout/:id', exact: true},
    {name: 'edit', path: '/layout/home/form/:id/edit', exact: true}
  ]},
  {route: '/layout/home/form/:id', items: [
    {name: 'explorer', path: '/layout/home', exact: true},
    {name: 'view', path: '/layout/:id', exact: true},
    {name: 'edit', path: '/layout/home/form/:id/edit', exact: true}
  ]},
];
