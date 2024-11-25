import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  // private api_url_products = 'https://order-food-app-3db245cdb31e.herokuapp.com/api/v1/product'
  private api_url_products = 'http://localhost:3000/api/v1/product'
  




  constructor(private http: HttpClient) { }

  getproduct():Observable<any[]>{
    return this.http.get<any[]>(this.api_url_products);
  }
}
