import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderCust as Order } from '../models/order-cust.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderCustService {
  constructor(private readonly http: HttpClient) {}

  insertOrder(order: Order): Observable<{
    isSuccess: boolean;
    data: Order;
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
}
