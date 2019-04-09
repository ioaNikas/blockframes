export const CONTEXT_MENU = [
  {
    route: 'default',
    items: [{ name: 'home', path: '/layout/home' }, { name: 'template', path: '/layout/template' }]
  },
  {
    route: '/layout/:mid',
    items: [
      { name: 'home', path: '/layout/home'},
      { name: 'view', path: '/layout/:mid/movie-materials'},
      { name: 'list', path: '/layout/:mid'}
    ]
  },
  {
    route: '/layout/:mid/view/:did',
    items: [
      { name: 'home', path: '/layout/home'},
      { name: 'list', path: '/layout/:mid'},
      { name: 'delivery', path: '/layout/:mid/view/:did'}
      
    ]
  },
  {
    route: '/layout/:mid/form/:did',
    items: [
      { name: 'home', path: '/layout/home'},
      { name: 'list', path: '/layout/:mid'},
      { name: 'delivery', path: '/layout/:mid/form/:did'}
    ]
  }
];
