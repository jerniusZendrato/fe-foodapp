import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { ProductsByCategory } from '../models/products-by-category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsByCategoryService {

  private apiUrl = `${environment.API_URL}/product/mapping-by-category/`;


  constructor(private http: HttpClient) { }

  getProductsbycategory(): Observable<ProductsByCategory[]> {
    return this.http.get<ProductsByCategory[]>(this.apiUrl);
  }
}
