import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderCust as Order } from '../models/order-cust.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { OrderHistoryCust } from '../models/order-history.model';

@Injectable({
  providedIn: 'root',
})
export class OrderCustService {
  constructor(private readonly http: HttpClient) {}

  insertOrder(order: Order): Observable<{
    isSuccess: boolean;
    data: OrderHistoryCust;
    errors: any
  }> {
    return this.http
      .post<{
        data: any;
        isSuccess: boolean;
        errors: any;
      }>(`${environment.API_URL}/order`, order)
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            console.log('Order inserted successfully insertOrder :', response.data);
            return response;
          } else {
            throw new Error('Failed to insert data');
          }
        }),
        catchError((error) => {
          console.error('Error occurred while inserting data:', error);
          return throwError(() => new Error('Failed to insert data'));
        })
      );
  }


  getOrder(orderId: string): Observable<{
    isSuccess: boolean;
    data: OrderHistoryCust;
    errors: any
  }> {
    return this.http
      .get<{
        data: OrderHistoryCust;
        isSuccess: boolean;
        errors: any;
      }>(`${environment.API_URL}/order/${orderId}`)
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            return response;
          } else {
            throw new Error('Failed to fetch order');
          }
        }),
        catchError((error) => {
          console.error('Error occurred while fetching order:', error);
          return throwError(() => new Error('Failed to fetch order'));
        })
      );
  }
}
