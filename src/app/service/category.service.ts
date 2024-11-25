


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private api_url_category = 'http://localhost:3000/api/v1/category'
  



  constructor(private http: HttpClient) { }

  getcategory():Observable<Product[]>{
    return this.http.get<Product[]>(this.api_url_category);
  }
}
