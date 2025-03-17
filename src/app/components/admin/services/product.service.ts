import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { AdminProduct } from '../models/admin-product.model';
import { catchError, map, Observable, throwError } from 'rxjs';

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


  getproduct(): Observable<AdminProduct[]> {
    return this.http.get<{ isSuccess: boolean; data: AdminProduct[] }>(`${environment.API_URL}/product`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Terjadi kesalahan saat mengambil produk:', error);
        return throwError(() => new Error('Gagal mengambil data produk'));
      })
    );
  }

  getProducts(): Observable<AdminProduct[]> {
    return this.http.get<AdminProduct[]>(this.apiUrl);
  }


  savestatusProducts(products: AdminProduct[]): Observable<any> {
    if (products && products.length > 0) {
      const dataToSend = products;  // Data produk yang akan dikirimkan langsung
      return this.http.patch< {isSuccess: boolean} >(`${environment.API_URL}/product`, dataToSend);
    } else {
      return new Observable((observer) => {
        observer.error('No valid products to save');
      });
    }
  }

  addProduct(product: AdminProduct, image: File): Observable<any> {
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



  updateroduct(product: AdminProduct, image: File|null, id:string): Observable<any> {
    const formData: FormData = new FormData();
    console.log("ini formData",product)
    const idproduct = encodeURIComponent(id);
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
    }else{
      formData.append('image', "null"); 
    }
    if(product.isActivated !== null)
      formData.append('isActivated', product.isActivated.toString()); 
    console.log("ini formData",formData)
    
    return this.http.put<any>(`${this.apiUrl}/${idproduct}`,formData );
  }


  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }
}
