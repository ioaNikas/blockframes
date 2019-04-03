export interface MenuItem {
  name: string;
  path: string;
  exact?: boolean;
}

export interface ContextMenu {
  route: string;
  items: MenuItem[];
}
