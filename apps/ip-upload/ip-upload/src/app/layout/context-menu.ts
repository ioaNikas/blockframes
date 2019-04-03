import { createContextMenu, createMenuItem } from '@blockframes/ui'

export const CONTEXT_MENU = [
  createContextMenu({route: 'default', items: [
    createMenuItem({name: 'explorer', path: '/layout/home'}),
    createMenuItem({name: 'example', path: '/layout/account/profile'}),
  ]}),
  createContextMenu({route: '/layout/ip/:id', items: [
    createMenuItem({name: 'explorer', path: '/layout/home'}),
    createMenuItem({name: 'view', path: '/layout/ip/:id', exact: true}),
    createMenuItem({name: 'edit', path: '/layout/ip/:id/edit', exact: true})
  ]}),
];
