export interface Category {
  id: string;
  name: string;
  items: {
    id: string;
    name: string;
  }[];
}
