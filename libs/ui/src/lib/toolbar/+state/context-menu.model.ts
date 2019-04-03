export interface MenuItem {
  name: string;
  path: string;
  exact: boolean;
}

export interface ContextMenu {
  route: string;
  items: MenuItem[];
}


export function createContextMenu(params?: Partial<ContextMenu>) {
  return params ? {
    route: params.route,
    items: params.items,
  } : {} as ContextMenu;
}

export function createMenuItem(params?: Partial<MenuItem>) {
  return params ? {
    name: params.name,
    path: params.path,
    exact: params.exact || false,
  } : {} as MenuItem;
}
