export interface AdminOrderCassier {
    id: string;
    code: string;
    customerName: string;
    totalPrice: number;
    priceBeforeTax: number;
    tax: number | null;
    paymentStatus: string;
    createdAt: string;
    // paymentStatus: 'paid' | 'unpaid';
    paymentPaidAt: string | null;
    deliverdAt: string | null;
    // status: 'process' | 'delivered';
    // type: 'dine in' | 'take away' | 'delivery';
    status: string;
    type: string;
    adminId: string;
    adminName: string;
    tableName: string;
    tableId: string;
    productOrders: ProductOrder[];
  }

  export interface ProductOrder {
    id?: string;
    name: string;
    urlImage?: string| null;
    price: number;
    description: string;
    category?: string;
    categoryId: string;
    isActivated: Boolean;
    quantity?: number;
  }