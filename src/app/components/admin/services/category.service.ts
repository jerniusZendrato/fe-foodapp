import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AdminCategory, patchCategory } from '../models/admin-category.model';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) {
    
   }


  getcategory():Observable<AdminCategory[]>{
    const dataLoginString = localStorage.getItem('datalogin');
    const token = dataLoginString ? JSON.parse(dataLoginString).token : null;

    const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
    });

    return this.http.get<{ isSuccess: boolean; data: AdminCategory[] }>(`${environment.API_URL}/category`,{ headers }).pipe(
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
    if(category){
      return this.http.post<any>(`${environment.API_URL}/categoryx`, category);
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
  putCategory(id:string, name:string): Observable<{ isSuccess: boolean }> {
    const newname = {"name": name}
    if(newname){
      console.log(newname)
      return this.http.put<{ isSuccess: boolean }>(`${environment.API_URL}/category/${id}`,newname);
    }else {
      return new Observable((observer) => {
        observer.error('Failed to delete the category.');
      });
    }
  }
}
