import { Injectable } from '@angular/core';
import { Order } from '../../../models/order.model';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.API_URL}/order`;
  private storageKey = 'costumerOrder';

  order: Order = {
    userName: '19282bbd-b7a6-48f8-9ef4-b62aace832aa',
    productOrders: [],
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getOrder(): Order | undefined {
    const storedOrder = localStorage.getItem(this.storageKey);
    if (storedOrder) {
      this.order = JSON.parse(storedOrder);
      return this.order;
    }
    return undefined;
  }

  clearOrder() {
   
    const userName = this.order.userName ? this.order.userName : '-';
    const noTable = this.order.noTable;

    localStorage.removeItem(this.storageKey);

 

    // Memperbarui nama dan nomor meja
    
    this.router.navigate(['/menu']);
    console.log('userName :>> ', userName);
    console.log('noTable :>> ', noTable);
    
    this.updateNameAndNoTabelOrder(userName, noTable) 
  }

  private updateLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.order));
  }

  decreaseQuantity(product: Product) {
    const existingProduct = this.order?.productOrders.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity -= 1;
      if (existingProduct.quantity < 1) {
        this.order.productOrders = this.order.productOrders.filter(
          (item) => item.id !== product.id
        );
      }
      this.updateLocalStorage();
    }

    console.log('this.order :>> ', this.order);
  }

  increaseQuantity(product: any) {
    const existingProduct = this.order?.productOrders.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.order?.productOrders.push({
        id: product.id,
        quantity: 1,
        name: product.name,
        price: product.price,
        urlImage: product.urlImage,
      });
    }
    this.updateLocalStorage(); // Update localStorage after adding a product
  }

  getProductQuantity(productId: string): number {
    // Retrieve the order from local storage
    const storedOrder = localStorage.getItem(this.storageKey);
    if (storedOrder) {
      this.order = JSON.parse(storedOrder);
    }

    // Find the product in the order
    const productOrder = this.order?.productOrders.find(
      (item) => item.id === productId
    );
    return productOrder ? productOrder.quantity : 0; // Return the quantity or 0 if not found
  }

  saveOrder(): Observable<any> {
    console.log('Entering saveOrder method...');
    const orderDataString = localStorage.getItem(this.storageKey);

    console.log('Retrieved orderData from localStorage: ', orderDataString);

    if (orderDataString) {
      try {
        const orderData = JSON.parse(orderDataString);
        console.log('Parsed orderData to JSON:', orderData);

        console.log('Order data found, proceeding to save...');
        console.log('API URL:', this.apiUrl);

        return this.http.post<any>(this.apiUrl, orderData).pipe(
          tap(() => {
            console.log('Order saved successfully.');
            localStorage.removeItem(this.storageKey);
            console.log('Order data cleared from localStorage.');
          }),
          catchError((error) => {
            console.error('Error saving order:', error);
            return of(null);
          })
        );
      } catch (error) {
        console.error('Error parsing orderData:', error);
        return of(null);
      }
    } else {
      console.warn('No order data to save.');
      return of(null);
    }
  }

  getTotalItemQuantity(): number {
    // Retrieve the order from local storage
    const storedOrder = localStorage.getItem(this.storageKey);
    if (storedOrder) {
      this.order = JSON.parse(storedOrder);
    }

    // Calculate the total quantity of items in the order
    return (
      this.order?.productOrders.reduce(
        (total, item) => total + item.quantity,
        0
      ) || 0
    );
  }

  getTotalPrice(): number {
    const storedOrder = localStorage.getItem(this.storageKey);
    if (storedOrder) {
      this.order = JSON.parse(storedOrder);
    }
    return (
      this.order.productOrders.reduce(
        (total: number, item: { price: number; quantity: number }) =>
          total + item.price * item.quantity,
        0
      ) || 0
    );
  }

  getTableNo(): number | undefined {
    const storedOrder = localStorage.getItem(this.storageKey);
    if (storedOrder) {
      this.order = JSON.parse(storedOrder);
      return this.order.noTable;
    }
    return undefined;
  }

  getCustomerName(): string | undefined {
    const storedOrder = localStorage.getItem(this.storageKey);
    if (storedOrder) {
      this.order = JSON.parse(storedOrder);
      return this.order.userName;
    }
    return undefined;
  }

  getTax(): number {
    return this.getTotalPrice() * 0.1;
  }

  updateNameAndNoTabelOrder(customerName: string, NoTableOrder?: number) {
    this.order.userName = customerName;
    this.order.noTable = NoTableOrder;
    this.updateLocalStorage();
  }

  getTotalTotalPrice(): number {
    return this.getTotalPrice() + this.getTax();
  }
}
