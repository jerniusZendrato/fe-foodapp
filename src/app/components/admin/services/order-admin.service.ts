import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminOrderCassier } from '../models/admin-order-cassier.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { HistoryOrderAdmin } from '../models/history-order-admin.model';

@Injectable({
  providedIn: 'root'
})
export class OrderAdminService {

  constructor(
    private http: HttpClient
  ) { }
  addorder(order:any): Observable<any>{
    if(order){
      return this.http.post<any>(`${environment.API_URL}/order`, order);
    }else{
      return new Observable((observer) => {
        observer.error('No valid order to add');
      });
    }
  }

  getorder(date: string):Observable<AdminOrderCassier[]>{
    // Buat parameter query hanya dengan 'date'
    const params = new HttpParams().set('date', date);
    return this.http.get<{ isSuccess: boolean; data: AdminOrderCassier[] }>(`${environment.API_URL}/order`,{params}).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Terjadi kesalahan saat mengambil produk:', error);
        return throwError(() => new Error('Gagal mengambil data produk'));
      })
    );
  }

  

  // data tarikan hystory order

  getorders():Observable<HistoryOrderAdmin[]>{
    // Buat parameter query hanya dengan 'date'
    // const params = new HttpParams().set('date', date);
    return this.http.get<{ isSuccess: boolean; data: HistoryOrderAdmin[] }>(`${environment.API_URL}/order`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Terjadi kesalahan saat mengambil produk:', error);
        return throwError(() => new Error('Gagal mengambil data produk'));
      })
    );
  }
  

  getorderbyid(id:string):Observable<AdminOrderCassier[]>{
    // const params = new HttpParams().set('id', id);
    return this.http.get<{ isSuccess: boolean; data: AdminOrderCassier[] }>(`${environment.API_URL}/order/${id}`).pipe(
      map(response => {
        return Array.isArray(response.data) ? response.data : [response.data]; // Konversi jadi array jika bukan
  }),
      catchError(error => {
        console.error('Terjadi kesalahan saat mengambil produk:', error);
        return throwError(() => new Error('Gagal mengambil data produk'));
      })
    );
  }

  patchpaymentstatus(status: string):Observable<any>{
    if (status && status.length > 0) {
      const params = encodeURIComponent(status);
      const body = {
        "paymentStatus": "paid"
    }
      return this.http.patch<{ isSuccess: boolean}>(`${environment.API_URL}/order/${params}/paymentStatus`,  body);
      
    }else {
      return new Observable((observer) => {
        observer.error('No valid category to save');
      }
    )
  }
  }

  
  

}
