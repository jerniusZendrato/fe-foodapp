import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Table } from '../models/table.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(
    private http: HttpClient
  ) { }


  gettable():Observable<Table[]>{
    return this.http.get<{ isSuccess: boolean; data: Table[] }>(`${environment.API_URL}/table`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Terjadi kesalahan saat mengambil produk:', error);
        return throwError(() => new Error('Gagal mengambil data produk'));
      })
    );
  }

  saveTable(table: Table[]): Observable<any> {
    if (table && table.length > 0) {
      const dataToSend = table;  // Data produk yang akan dikirimkan langsung
      return this.http.put< {isSuccess: boolean} >(`${environment.API_URL}/table`, dataToSend);
    } else {
      return new Observable((observer) => {
        observer.error('No valid category to save');
      });
    }
  }
}
