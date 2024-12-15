export interface Product {
  id: string;
  name: string;
  urlImage: string| null;
  price: number;
  description: string;
  category: string;
  categoryId: string;
  isActivated: Boolean;
} 



// export interface Product {
//     id?: number;
//     name?: string;
//     urlImage?: string;
//     price: Float64Array;
//     description?: string;
//     category?: string;
//     categoryId?: string;
//     isActivated?: Boolean;
//   } 
