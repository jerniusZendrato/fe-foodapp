import { Injectable } from '@angular/core';
import { addUserAdmin, changeUserAdmin, UserAdmin } from '../models/user-admin.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';
import { DashboardComponent } from '../shared/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class UserAdminServiceService {

  constructor(private http: HttpClient,
  ) { }

  getuser():Observable<UserAdmin[]>{
      return this.http.get<{ isSuccess: boolean; data: UserAdmin[] }>(`${environment.API_URL}/users`).pipe(
        map(response => response.data),
        catchError(error => {
                console.error('Terjadi kesalahan saat mengambil produk:', error);
                return throwError(() => new Error('Gagal mengambil data produk'));
        })
      );
  }
  

  adduser(name:string, birthday: string, role: string):Observable<UserAdmin[]>{
    const input={
      name:name,
      birthday: birthday,
      role:role
    }
    return this.http.post<{ isSuccess: boolean; data: UserAdmin[] }>(`${environment.API_URL}/auth/reqister`,input).pipe(
      map(response => {
        if (response.isSuccess) {
          return response.data;
        } else {
          return []; // atau lempar error
        }}
      ),
      catchError(error => {
              console.error('Terjadi kesalahan saat mengambil produk:', error);
              return throwError(() => new Error('Gagal mengambil data produk'));
      })
    );
  }

  
  deleteuser(id:string): Observable<any> {
    return this.http.delete(`${environment.API_URL}/users/me/${id}`);
  }

  
  
  
}
