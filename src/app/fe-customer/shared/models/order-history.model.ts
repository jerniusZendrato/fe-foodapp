export interface OrderhistoryItemCust {
  category: string;
  categoryId: string;
  description: string;
  urlImage: string;
  name: string;
  id: string;
  productId: string;
  price: number;
  productName: string;
  quantity: number;
  productPrice: number;
}
export interface OrderHistoryCust {
  id?: string;
  code?: string | null;
  createdAt: Date;
  type: string;
  tableNumber: string | number;
  tableName: string | number;
  adminName: string;
  customerName: string;
  paymentMethod: string;
  subTotalPrice: number;
  tax: number;
  totalPrice: number;
  totalQuantity:number;
  status?: string;
  productOrders?: OrderhistoryItemCust[];
}
