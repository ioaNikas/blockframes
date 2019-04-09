export const CONTEXT_MENU = [
  {
    route: 'default',
    items: [{ name: 'home', path: '/layout/home' }, { name: 'template', path: '/layout/template' }]
  },
  {
    route: '/layout/:movieId',
    items: [
      { name: 'home', path: '/layout/home'},
      { name: 'view', path: '/layout/:movieId/movie-materials'},
      { name: 'list', path: '/layout/:movieId'}
    ]
  },
  {
    route: '/layout/:movieId/view/:deliveryId',
    items: [
      { name: 'home', path: '/layout/home'},
      { name: 'delivery', path: '/layout/:movieId/view/:deliveryId'},
      { name: 'list', path: '/layout/:movieId', exact: true}, 
    ]
  },
  {
    route: '/layout/:movieId/form/:deliveryId',
    items: [
      { name: 'home', path: '/layout/home'},
      { name: 'delivery', path: '/layout/:movieId/form/:deliveryId'},
      { name: 'list', path: '/layout/:movieId', exact: true}
    ]
  }
];
