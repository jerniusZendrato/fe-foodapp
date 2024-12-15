


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {




  constructor(private http: HttpClient) { }

  getcategory():Observable<Category[]>{
    return this.http.get<{ isSuccess: boolean; data: Category[] }>(`${environment.API_URL}/category`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Terjadi kesalahan saat mengambil produk:', error);
        return throwError(() => new Error('Gagal mengambil data produk'));
      })
    );
  }

  getCategories(): Observable< Category[]> {
    console.log('servive getCategories :>> ');
    return this.http.get<Category[]>(`${environment.API_URL}/category`);
  }

}
