import { Product } from "./product.model";

export interface CategoryData {
  img: string;
  products: Product[];
}
export interface ProductsByCategory {
    category: CategoryData[];
}

