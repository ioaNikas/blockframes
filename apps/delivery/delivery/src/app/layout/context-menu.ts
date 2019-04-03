import { createContextMenu, createMenuItem } from '@blockframes/ui'

export const CONTEXT_MENU = [
  createContextMenu({route: 'default', items: [
    createMenuItem({name: 'explorer', path: '/layout/home'}),
    createMenuItem({name: 'example', path: '/layout/account/profile'}),
  ]}),
  createContextMenu({route: '/layout/home/movie/:id', items: [
    createMenuItem({name: 'explorer', path: '/layout/home', exact: true}),
    createMenuItem({name: 'view', path: '/layout/home/movie/:id', exact: true}),
    createMenuItem({name: 'edit', path: '/layout/home/form/:id/edit', exact: true})
  ]}),
  createContextMenu({route: '/layout/home/form/:id', items: [
    createMenuItem({name: 'explorer', path: '/layout/home', exact: true}),
    createMenuItem({name: 'view', path: '/layout/home/movie/:id', exact: true}),
    createMenuItem({name: 'edit', path: '/layout/home/form/:id/edit', exact: true})
  ]}),
];
