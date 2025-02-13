import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderViewAdmin } from '../models/order-view-admin.model';
import { environment } from '../environment/environment';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderAdminService {

  constructor(
    private http: HttpClient
  ) { }

  getorder():Observable<OrderViewAdmin[]>{
    return this.http.get<{ isSuccess: boolean; data: OrderViewAdmin[] }>(`${environment.API_URL}/order`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Terjadi kesalahan saat mengambil produk:', error);
        return throwError(() => new Error('Gagal mengambil data produk'));
      })
    );
  }


}
