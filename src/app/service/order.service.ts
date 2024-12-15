import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.API_URL}/order`;

  private storageKey = 'userOrder'; // Key for localStorage

  constructor(private http: HttpClient) { }
  
  addOrder(order: Order | undefined) {
    if (order) {
      localStorage.setItem(this.storageKey, JSON.stringify(order)); // Store order in localStorage
    }
  }

  getOrder(): Order | undefined {
    const orderData = localStorage.getItem(this.storageKey); // Retrieve order from localStorage
    return orderData ? JSON.parse(orderData) : undefined; // Parse and return the order or undefined
  }

  clearOrder() {
    localStorage.removeItem(this.storageKey); // Optional: Method to clear the order from localStorage
  }

  saveOrder(): Observable<any> {
    console.log('Entering saveOrder method...');
    const orderDataString = localStorage.getItem(this.storageKey);
    
    console.log('Retrieved orderData from localStorage: ', orderDataString);
    
    // Check if there is any order data to save
    if (orderDataString) {
      try {
        const orderData = JSON.parse(orderDataString); // Convert string to JSON object
        console.log('Parsed orderData to JSON:', orderData);
        
        console.log('Order data found, proceeding to save...');
        console.log('API URL:', this.apiUrl); // Log the API URL
        
        return this.http.post<any>(this.apiUrl, orderData).pipe(
          tap(() => {
            console.log('Order saved successfully.');
            localStorage.removeItem(this.storageKey);
            console.log('Order data cleared from localStorage.');
          }),
          catchError(error => {
            console.error('Error saving order:', error); // Log the error
            return of(null); // Return an observable of null or handle as needed
          })
        );
      } catch (error) {
        console.error('Error parsing orderData:', error); // Log parsing error
        return of(null); // Return an observable of null or handle as needed
      }
    } else {
      console.warn('No order data to save.'); // Log warning for no data
      return of(null); // Return an observable of null or handle as needed
    }
  }
}

