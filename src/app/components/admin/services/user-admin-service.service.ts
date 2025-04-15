import { Injectable } from '@angular/core';
import { changeUserAdmin, UserAdmin } from '../models/user-admin.model';
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

  
  
}
