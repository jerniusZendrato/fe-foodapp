import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { AdminTable } from '../models/admin-table.model';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private tableSubject = new BehaviorSubject<AdminTable[]>([]);
  table$ = this.tableSubject.asObservable();


  constructor(
    private http: HttpClient) { }

  gettable():Observable<AdminTable[]>{
    return this.http.get<{ isSuccess: boolean; data: AdminTable[] }>(`${environment.API_URL}/table`).pipe(
      map(response => response.data),

      // buat get data update baru
      // tap((data) => {
      //   if (data) {
      //     this.tableSubject.next(data); // Update data ke BehaviorSubject
      //   } else {
      //     console.error('Gagal mengambil data tabel:', data);
      //   }
      // }),
      // jika ada eror
      catchError(error => {
        console.error('Terjadi kesalahan saat mengambil produk:', error);
        return throwError(() => new Error('Gagal mengambil data produk'));
      })
    );
  }

// service update status table
  saveTable(tables:{id: string, activated:boolean}[] ): Observable<any> {
    if (tables && tables.length > 0) {
      const formattedData = {
        table: tables.map(t => ({
          id: t.id,
          isActivated: t.activated
        }))
      };
      console.log("Ini data dataToSend ",formattedData)
      return this.http.patch< {isSuccess: boolean} >(`${environment.API_URL}/table/status`, formattedData);
    } else {
      return new Observable((observer) => {
        observer.error('No valid category to save');
      });
    }
  }


  addTable(toadd:{"name": number| null}): Observable<any> {
    if (toadd) {
      const dataToSend = toadd;
      console.log(JSON.stringify(dataToSend))
      return this.http.post< {isSuccess: boolean} >(`${environment.API_URL}/table`, dataToSend);
    } else {
      return new Observable((observer) => {
        observer.error('No valid category to save');
      });
    }
  }
}
