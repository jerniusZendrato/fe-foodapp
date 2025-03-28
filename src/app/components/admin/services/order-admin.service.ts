import { HttpClient, HttpParams } from '@angular/common/http';
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

  
  

}
