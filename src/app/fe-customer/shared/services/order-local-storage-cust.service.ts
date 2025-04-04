import { Injectable } from '@angular/core';
import {
  CustomerOrderItem,
  OrderCust as Order,
} from '../models/order-cust.model';

import { ProductCust as Product } from '../models/product-cust.model';
import { DerectService } from './derect.service';
import { OrderCustService } from './order-cust.service';
import {
  OrderHistoryCust,
  OrderhistoryItemCust,
} from '../models/order-history.model';
import { catchError, Observable, tap, throwError } from 'rxjs';

interface OrderResponse {
  isSuccess: boolean;
  data: OrderHistoryCust;
  errors: any;
}

@Injectable({
  providedIn: 'root',
})
export class OrderLocalStorageCustService {
  order!: Order;
  orderItem: CustomerOrderItem[] = [];

  private readonly STORAGE_KEY_ORDER = 'order';
  private readonly STORAGE_KEY_ORDERED = 'ordered';
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

  getProductOrder(): CustomerOrderItem[] | undefined {
    return this.order.productOrders;
  }

  getOrder(): Order | null {
    const storedOrder = localStorage.getItem(this.STORAGE_KEY_ORDER);
    return storedOrder ? JSON.parse(storedOrder) : null;
  }

  getHistoryOrder(): OrderHistoryCust[] | null {
    const storedHistoyOrder = localStorage.getItem(
      this.STORAGE_KEY_ORDER_HISTORY
    );
    return storedHistoyOrder ? JSON.parse(storedHistoyOrder) : null;
  }

  getOrdered(): OrderHistoryCust | null {
    const storedOrdered = localStorage.getItem(this.STORAGE_KEY_ORDERED);
    return storedOrdered ? JSON.parse(storedOrdered) : null;
  }

  pushOrderd(order: OrderHistoryCust) {
    localStorage.setItem(this.STORAGE_KEY_ORDERED, JSON.stringify(order));
  }

  addOrderToHistory(newOrder: OrderHistoryCust): void {
    // Retrieve existing order history
    const storedHistoryOrder = localStorage.getItem(
      this.STORAGE_KEY_ORDER_HISTORY
    );
    const orderHistory: OrderHistoryCust[] = storedHistoryOrder
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
      adminId: 'a8f53d7a-8582-4181-9c38-ea067edae6cc',
      productOrders: this.orderItem,
    };
  }

  insertOrder(): Observable<OrderResponse> {
    return this.orderService.insertOrder(this.order).pipe(
      tap((response) => {
        if (response.isSuccess) {
          this.handleSuccessfulOrder(response.data);
        }
      }),
      catchError((error) => {
        console.error('Error inserting order:', error);
        return throwError(() => new Error('Failed to insert order'));
      })
    );
  }

  private handleSuccessfulOrder(order: OrderHistoryCust): void {
    localStorage.removeItem(this.STORAGE_KEY_ORDER);
    this.order.productOrders = [];
    console.log('Order inserted handleSuccessfulOrder successfully:', order);
    this.saveOrder(this.order);
    this.pushOrderd(order);
    this.addOrderToHistory(order);
    this.derect.toOrderSummary();
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
    if (!this.order.productOrders) {
      console.error('Order or productOrders is undefined');
      return;
    }

    const existingProductOrder = this.order.productOrders.find(
      (po) => po.id === product.id
    );

    if (existingProductOrder) {
      existingProductOrder.quantity = (existingProductOrder.quantity || 0) + 1;
    } else {
      this.order.productOrders.push({ ...product, quantity: 1 });
    }

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

  getSubTotalPrice(): number {
    let totalPrice = 0;

    if (this.order.productOrders) {
      for (const productOrder of this.order.productOrders) {
        totalPrice += (productOrder.quantity ?? 0) * (productOrder.price || 0);
      }
    }
    return totalPrice;
  }

  getTax(): number {
    let tax = 0;
    let subTotalPrice = this.getSubTotalPrice();

    tax = subTotalPrice * 0.1;

    return tax;
  }

  getTotatPrice(): number {
    let subTotalPrice = this.getSubTotalPrice();
    let tax = this.getTax();
    return subTotalPrice + tax;
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

  isOrderValid(): boolean {
    if (!this.order.customerName || !this.order.tableId) {
      return false;
    }
    if (this.order && (this.order.productOrders?.length ?? 0) < 0) {
      return false;
    }

    return true;
  }

  makeOrderAgain(orderId: string): boolean {
    
    // Get order history from local storage
    const orderHistory = this.getHistoryOrder();
    if (!orderHistory) {
      console.error('No order history found');
      return false;
    }

    // Find the order with matching orderId

    const orderToRepeat = orderHistory.find(order => order.id === orderId);
    if (!orderToRepeat) {
      console.error('Order not found in history');
      return false;
    }

    // Clear current order
    this.order.productOrders = [];
    
    // 
    // Convert order history items to product orders
    orderToRepeat.productOrders?.forEach((item: OrderhistoryItemCust) => {
      console.log('Item:', item);
      const product: Product = {
        id: item.productId,               
        quantity: item.quantity ?? 0,
        price: item.price,                
        name: item.name,                  
        urlImage: item.urlImage,
        description: item.description,
        category: item.category ?? null,  
        categoryId: item.categoryId ?? "",
        isActivated: true,
      };
      
      this.order.productOrders?.push({ ...product, quantity: product.quantity ?? 0 });
      console.log('Order to repeat:', this.order.productOrders);
    });

    
    // Save the new order
    this.saveOrder(this.order);
    return true;
  }
}
