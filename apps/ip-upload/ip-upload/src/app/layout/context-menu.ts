export const CONTEXT_MENU = [
  {route: 'default', items: [
    {name: 'explorer', path: '/layout/home'},
    {name: 'example', path: '/layout/account/profile'},
  ]},
  {route: '/layout/ip/:id', items: [
    {name: 'explorer', path: '/layout/home'},
    {name: 'view', path: '/layout/ip/:id', exact: true},
    {name: 'edit', path: '/layout/ip/:id/edit', exact: true}
  ]},
];
