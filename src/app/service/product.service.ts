import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private apiUrl = `${environment.API_URL}/product`;





  constructor(private http: HttpClient) { }

  // getproduct():Observable<Product[]>{
  //   return this.http.get<Product[]>(this.api_url_products);
  // }

  // getproduct():Observable<Product[]>{
  //   return this.http.get<Product[]>(this.api_url_products).pipe(
  //     catchError(error => {
  //       console.error('Terjadi kesalahan saat mengambil produk:', error);
  //       return throwError(() => new Error('Gagal mengambil data produk. Silakan coba lagi nanti.'));
  //     })
  //   );;
  // }


  getproduct(): Observable<Product[]> {
    return this.http.get<{ isSuccess: boolean; data: Product[] }>(`${environment.API_URL}/product`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Terjadi kesalahan saat mengambil produk:', error);
        return throwError(() => new Error('Gagal mengambil data produk'));
      })
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }


  saveProducts(products: Product[]): Observable<any> {
    if (products && products.length > 0) {
      const dataToSend = products;  // Data produk yang akan dikirimkan langsung
      return this.http.put< {isSuccess: boolean} >(`${environment.API_URL}/product`, dataToSend);
    } else {
      return new Observable((observer) => {
        observer.error('No valid products to save');
      });
    }
  }

  addProduct(product: Product, image: File): Observable<any> {
    const formData: FormData = new FormData();
    if (product.name) {
      formData.append('name', product.name);
    }
    if (product.price !== undefined) {
      formData.append('price', product.price.toString());
    }
    if (product.description) {
      formData.append('description', product.description);
    }
    if (product.categoryId) {
      formData.append('categoryId', product.categoryId.toString());
    }
    if (image) {
      formData.append('image', image, image.name);
    }

    return this.http.post<any>(this.apiUrl, formData);
  }
  
}
