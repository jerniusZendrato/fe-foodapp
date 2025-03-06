import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AdminCategory, patchCategory } from '../models/admin-category.model';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  
  constructor(private http: HttpClient) { }

  getcategory():Observable<AdminCategory[]>{
    return this.http.get<{ isSuccess: boolean; data: AdminCategory[] }>(`${environment.API_URL}/category`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Terjadi kesalahan saat mengambil produk:', error);
        return throwError(() => new Error('Gagal mengambil data produk'));
      })
    );
  }

  getCategories(): Observable< AdminCategory[]> {
    console.log('servive getCategories :>> ');
    return this.http.get<AdminCategory[]>(`${environment.API_URL}/category`);
  }

  saveCategory(category:any): Observable<any>{
    if(category && category.length > 0){
      const dataToSend = category;
      return this.http.post< {isSuccess: boolean} >(`${environment.API_URL}/category`, dataToSend);
    }else{
      return new Observable((observer) => {
        observer.error('No valid category to save');
      });
    }
  }

  savestatusCategory(categorystatus: patchCategory): Observable<any> {
    if (categorystatus && categorystatus.category.length > 0) {
      const dataToSend = categorystatus;  // Data produk yang akan dikirimkan langsung
      return this.http.patch< {isSuccess: boolean} >(`${environment.API_URL}/category/status`, dataToSend);
    } else {
      return new Observable((observer) => {
        observer.error('No valid category to save');
      });
    }
  }

  deleteCategory(categoryId: string): Observable<{ isSuccess: boolean }> {
    if(categoryId){
      return this.http.delete<{ isSuccess: boolean }>(`${environment.API_URL}/category/${categoryId}`);
    }else {
      return new Observable((observer) => {
        observer.error('Failed to delete the category.');
      });
    }
  }
}
