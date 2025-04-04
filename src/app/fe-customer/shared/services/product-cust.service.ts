import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { ProductCust as Product } from '../models/product-cust.model';

@Injectable({
  providedIn: 'root',
})
export class ProductCustService {
  private readonly apiUrl = environment.API_URL + '/product';

  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<{ isSuccess: boolean; data: Product[] }>(this.apiUrl).pipe(
      map((response) => {
        if (response.isSuccess) {
          return response.data;
        } else {
          throw new Error('Failed to fetch product data');
        }
      }),
      catchError((error) => {
        return throwError(() => new Error('Failed to fetch product data'));
      })
    );
  }
}
