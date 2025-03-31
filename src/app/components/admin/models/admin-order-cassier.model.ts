export interface AdminOrderCassier {
    id: string;
    code: string;
    customerName: string;
    totalPrice: number;
    priceBeforeTax: number;
    tax: number | null;
    createdAt: string;
    paymentStatus: string;
    paymentPaidAt: string | null;
    deliveredAt: string | null;
    status: string;
    type: string;
    adminId: string;
    subTotalPrice?: number;
    adminName: string;
    tableName: string;
    tableId: string;
    productOrders: AdminDetailOrderCassier[];
  }
  export interface AdminDetailOrderCassier{
    id : string;
    name : string;
    quantity : number;
    subTotalPrice : number;
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

  export interface addProductOrder {
    id : string;
    quantity: number;
    }

  
    