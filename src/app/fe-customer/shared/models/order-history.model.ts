export interface OrderhistoryItemCust {
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
  productOrders?: OrderhistoryItemCust[];
}
