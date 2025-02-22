import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminOrderCassier } from '../models/admin-order-cassier.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderAdminService {

  constructor(
    private http: HttpClient
  ) { }

  getorder():Observable<AdminOrderCassier[]>{
    return this.http.get<{ isSuccess: boolean; data: AdminOrderCassier[] }>(`${environment.API_URL}/order`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Terjadi kesalahan saat mengambil produk:', error);
        return throwError(() => new Error('Gagal mengambil data produk'));
      })
    );
  }
}
