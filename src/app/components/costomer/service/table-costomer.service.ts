import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Table } from 'src/app/models/table.model';

@Injectable({
  providedIn: 'root',
})
export class TableCostomerService {
  constructor(private http: HttpClient) {}

  getTable(id: string): Observable<Table> {
    return this.http
      .get<{ isSuccess: boolean; data: Table }>(
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
