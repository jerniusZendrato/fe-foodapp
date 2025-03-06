import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { CategoryCust as category } from '../models/category-cust.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryCustService {
  private readonly apiUrl = environment.API_URL + '/category';

  constructor(private readonly http: HttpClient) {}

  getCategories(): Observable<category[]> {
    return this.http
      .get<{ isSuccess: boolean; data: category[] }>(this.apiUrl)
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            return response.data;
          } else {
            throw new Error('Failed to fetch category data');
          }
        }),
        catchError((error) => {
          console.error('Error occurred while fetching category:', error);
          return throwError(() => new Error('Failed to fetch category data'));
        })
      );
  }
}

