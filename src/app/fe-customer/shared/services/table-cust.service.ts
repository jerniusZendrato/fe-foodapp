import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { TableCust } from '../models/table-cust.model';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TableCustService {


  constructor(private readonly http: HttpClient) {}

  getTable(id: string): Observable<TableCust> {
    return this.http
      .get<{ isSuccess: boolean; data: TableCust }>(
        `${environment.API_URL}/table/${id}`
      )
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            return response.data;
          } else {
            throw new Error('Failed to fetch table data');
          }
        }),
        catchError((error) => {
          console.error('Error occurred while fetching table:', error);
          return throwError(() => new Error('Failed to fetch table data'));
        })
      );
  }
}
