export interface AppState {
  appName: string;
  actionState: string;
  inventory: Array<Machines>;
  filteredScreen: Category;
}
export interface Machines {
  items: Array<Category>;
  structure: Category;
}
export interface Category {
  id: number;
  categoryName: string;
  attributes: Array<Attributes>;
}
export interface Items {
  categoryName: string;
  title: string;
  // data: Array<>
}

export interface Attributes {
  id: number;
  label: string;
  type: string;
  value: string;
  isTitle: boolean;
}
