export const CONTEXT_MENU = [
  {
    route: 'default',
    items: [{ name: 'home', path: '/layout/home' }, { name: 'template', path: '/layout/template' }]
  },
  {
    route: '/layout/:movieid',
    items: [
      { name: 'home', path: '/layout/home'},
      { name: 'view', path: '/layout/:movieid/movie-materials'},
      { name: 'list', path: '/layout/:movieid'}
    ]
  },
  {
    route: '/layout/:movieid/view/:deliveryid',
    items: [
      { name: 'home', path: '/layout/home'},
      { name: 'delivery', path: '/layout/:movieid/view/:deliveryid'},
      { name: 'list', path: '/layout/:movieid', exact: true}, 
    ]
  },
  {
    route: '/layout/:movieid/form/:deliveryid',
    items: [
      { name: 'home', path: '/layout/home'},
      { name: 'delivery', path: '/layout/:movieid/form/:deliveryid'},
      { name: 'list', path: '/layout/:movieid', exact: true}
    ]
  }
];
