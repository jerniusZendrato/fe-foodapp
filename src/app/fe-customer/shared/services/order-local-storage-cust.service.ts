import { Injectable } from '@angular/core';
import {
  CustomerOrderItem,
  OrderCust as Order,
} from '../models/order-cust.model';

import { ProductCust as Product } from '../models/product-cust.model';
import { DerectService } from './derect.service';
import { OrderCustService } from './order-cust.service';

@Injectable({
  providedIn: 'root',
})
export class OrderLocalStorageCustService {
  order!: Order;
  orderItem: CustomerOrderItem[] = [];

  private readonly STORAGE_KEY_ORDER = 'order';
  private readonly STORAGE_KEY_ORDER_HISTORY = 'order-history';

  constructor(
    private readonly derect: DerectService,
    private readonly orderService: OrderCustService
  ) {
    this.initializeOrder();
    const storedOrder = this.getOrder();
    if (storedOrder) {
      this.order = storedOrder;
    }
  }

  getOrder(): Order | null {
    const storedOrder = localStorage.getItem(this.STORAGE_KEY_ORDER);
    return storedOrder ? JSON.parse(storedOrder) : null;
  }

  getHistoryOrder(): Order[] | null {
    const storedHistoyOrder = localStorage.getItem(
      this.STORAGE_KEY_ORDER_HISTORY
    );
    return storedHistoyOrder ? JSON.parse(storedHistoyOrder) : null;
  }

  addOrderToHistory(newOrder: Order): void {
    // Retrieve existing order history
    const storedHistoryOrder = localStorage.getItem(
      this.STORAGE_KEY_ORDER_HISTORY
    );
    const orderHistory: Order[] = storedHistoryOrder
      ? JSON.parse(storedHistoryOrder)
      : [];

    // Add the new order to the history
    orderHistory.unshift(newOrder);

    // Save the updated order history back to local storage
    localStorage.setItem(
      this.STORAGE_KEY_ORDER_HISTORY,
      JSON.stringify(orderHistory)
    );
  }

  private initializeOrder() {
    this.order = {
      customerName: '',
      tableId: '',
      tableName: '',
      type: 'Dinning Table',
      adminId: 'beb5b621-d9bb-42b0-b14c-8b719d093756',
      productOrders: this.orderItem,
    };
  }


  insertOrder(): void {
    this.orderService.insertOrder(this.order).subscribe({
      next: (response) => {
        console.log('response :>> ', response);
        if (response.isSuccess) {
          this.order = response.data; // Ambil data dari response
          const orderId = this.order.id
          localStorage.removeItem(this.STORAGE_KEY_ORDER);
          this.order.productOrders = [];
          this.saveOrder(this.order);
          this.addOrderToHistory(this.order)
          this.derect.toOrderSummary(orderId);

        } else {
          console.error('Failed to insert order:', response.errors);
        }
      },
      error: (error) => {
        console.error('Error inserting order:', error);
      },
      complete: () => {
        console.log('Insert order observable completed');
      },
    });
  }

  saveOrder(order: Order): void {
    localStorage.setItem(this.STORAGE_KEY_ORDER, JSON.stringify(order));
  }

  insertNameAndTableNamaAndTableId(
    customerName: string,
    tableId: string,
    tableName: string | number
  ) {
    this.order.customerName = customerName;
    this.order.tableId = tableId;
    this.order.tableName = tableName;
    this.saveOrder(this.order);
  }

  incrementQuantity(product: Product): void {
    console.log('start inc');
    if (!this.order.productOrders) {
      console.error('Order or productOrders is undefined');
      return;
    }

    console.log('existingProductOrder');

    const existingProductOrder = this.order.productOrders.find(
      (po) => po.id === product.id
    );

    if (existingProductOrder) {
      existingProductOrder.quantity = (existingProductOrder.quantity || 0) + 1;
    } else {
      this.order.productOrders.push({ ...product, quantity: 1 });
    }

    console.log('this.order :>> ', this.order);

    this.saveOrder(this.order);
  }

  decrementQuantity(product: Product): void {
    if (!this.order?.productOrders) {
      console.error('Order or productOrders is undefined');
      return;
    }

    const existingProductOrder = this.order.productOrders.find(
      (po) => po.id === product.id
    );

    if (existingProductOrder && existingProductOrder.quantity > 0) {
      existingProductOrder.quantity--;

      if (existingProductOrder.quantity <= 0) {
        this.order.productOrders = this.order.productOrders.filter(
          (po) => po.id !== product.id
        );
      }
    }

    this.saveOrder(this.order);
  }

  removeOrder() {
    localStorage.removeItem(this.STORAGE_KEY_ORDER);
    this.order.productOrders = [];
    this.saveOrder(this.order);
    this.derect.toMenuPage();
  }

  getProductQuantity(id: string): number {
    const productOrder = this.order?.productOrders?.find((po) => po.id === id);
    return productOrder ? productOrder.quantity ?? 0 : 0;
  }

  getProductTotalQuantity(): number {
    let totalQuantity = 0;

    if (this.order.productOrders) {
      for (const productOrder of this.order.productOrders) {
        totalQuantity += productOrder.quantity ?? 0;
      }
    }
    return totalQuantity;
  }

  getTotalPrice(): number {
    let totalPrice = 0;

    if (this.order.productOrders) {
      for (const productOrder of this.order.productOrders) {
        totalPrice += (productOrder.quantity ?? 0) * (productOrder.price || 0);
      }
    }
    return totalPrice;
  }

  getCostumerName(): string {
    return this.order.customerName;
  }

  getOrderType(): string {
    return this.order.type;
  }

  getTable(): string | number {
    return this.order.tableName;
  }
}
