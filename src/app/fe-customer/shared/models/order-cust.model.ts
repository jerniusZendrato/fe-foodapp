export interface CustomerOrderItem {
  id: string;
  quantity: number;
}

export interface OrderCust {
  customerName: string;
  type: string;
  tableId: string;
  adminId: string;
  productOrders?: CustomerOrderItem[];
}
