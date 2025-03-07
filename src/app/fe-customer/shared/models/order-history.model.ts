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
  adminName: string;
  customerName: string;
  paymentMethod: string;
  subTotalPrice: number;
  tax: number;
  totalPrice: number;
  totalQuantity:number;
  productOrders?: OrderhistoryItemCust[];
}

// "data": {
//     "id": "f598fa71-5124-496f-a44e-54ad665c8d97",
//     "code": null,
//     "customerName": "budi lagi nihh bro",
//     "type": "Dinning Table",
//     "tableId": "5e6a69a8-82e4-4da5-80c3-3c84e88ee417",
//     "adminId": "beb5b621-d9bb-42b0-b14c-8b719d093756",
//     "tableName": "999",
//     "adminName": "budi",
//     "createdAt": "2025-03-06T04:25:38.127084568",
//     "paymentStatus": "UNPAID",
//     "paymentPaidAt": null,
//     "status": "PROCESS",
//     "deliveredAt": null,
//     "subTotalPrice": 1213123,
//     "totalPrice": 1334435.3,
//     "tax": 121312.3,
//     "priceBeforeTax": 1213123,
//     "orderItemIds": [
//         "783b5680-63d2-4a70-885b-301a910157f0"
//     ]
// },