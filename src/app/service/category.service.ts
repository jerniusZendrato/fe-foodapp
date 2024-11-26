


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private api_url_category = 'http://localhost:3000/api/v1/category'
  



  constructor(private http: HttpClient) { }

  getcategory():Observable<Category[]>{
    return this.http.get<{ isSuccess: boolean; data: Category[] }>(this.api_url_category).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Terjadi kesalahan saat mengambil produk:', error);
        return throwError(() => new Error('Gagal mengambil data produk'));
      })
    );
  }
}
