import { createContextMenu, createMenuItem } from '@blockframes/ui'

export const CONTEXT_MENU = [
  createContextMenu({route: 'default', items: [
    createMenuItem({name: 'explorer', path: '/layout/home'}),
    createMenuItem({name: 'example', path: '/layout/account/profile'}),
  ]}),
];
