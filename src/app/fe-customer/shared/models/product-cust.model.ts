export interface ProductCust {
  id: string;
  name: string;
  urlImage: string;
  price: number;
  description: string;
  category: string;
  categoryId: string;
  isActivated: boolean;
  quantity?: number
}
