export interface HistoryOrderAdmin {
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
        productOrders: DetailOrderCassier[];
}

export interface DetailOrderCassier{
    name : string;
    quantity : number;
    subTotalPrice : number;
  }

