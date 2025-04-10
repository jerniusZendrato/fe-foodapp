import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { AdminLogin } from '../models/admin-login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  loginservice(user_id: string, password: string): Observable<any>{
    if(user_id &&password){
      const body = {
        user_id: user_id,
        password: password
      };
      return this.http.post<{ isSuccess: boolean, data:AdminLogin[]}>(`${environment.API_URL}/auth/login`,body);
    }else {
          return new Observable((observer) => {
            observer.error('No valid to login! ');
          });
        }
  }
}
