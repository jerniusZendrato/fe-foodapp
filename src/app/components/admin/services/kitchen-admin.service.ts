import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminOrderCassier } from '../models/admin-order-cassier.model';
import { environment } from 'src/app/environment/environment';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KitchenAdminService {

  constructor(
    private http: HttpClient
  ) { }

  getkitchenorder(date:string, status:string):Observable<AdminOrderCassier[]>{
    const params = new HttpParams().set('date', date).set('orderStatus', status);
    return this.http.get<{ isSuccess: boolean; data: AdminOrderCassier[] }>(`${environment.API_URL}/order`,{params}).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Terjadi kesalahan saat mengambil produk:', error);
        return throwError(() => new Error('Gagal mengambil data produk'));
      })
    );
  }

  patchorderstatus(status:string):Observable<any>{
  if (status && status.length > 0) {
    const params = encodeURIComponent(status);
    const body = {
      "orderStatus": "delivered"
  }
    return this.http.patch<{ isSuccess: boolean}>(`${environment.API_URL}/order/${params}/orderStatus`,  body);
    
  }else {
    return new Observable((observer) => {
      observer.error('No valid category to save');
    }
  )
}
}
}
