export const CONTEXT_MENU = [
  {
    route: 'default',
    items: [
      { name: 'home', path: '/layout/o/catalog/home' },
      { name: 'movie list', path: '/layout/o/catalog/list' }, // temp
      { name: 'Upload avails & films doc', path: '/layout/o/home/import' }, // temp until good place for this route is found
    ]
  },
  {
    route: '/layout/o/catalog/:movieId/edit',
    items: [
      { name: 'home', path: '/layout/o/catalog/home' },
      { name: 'edit movie', path: '/layout/o/catalog/:movieId/edit' },
    ]
  }
];
