import { Injectable } from '@angular/core';
import { AdminProduct } from '../models/admin-product.model';
import { ProductOrder } from '../models/admin-order-cassier.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageOrderService {

  constructor() { }

  // Simpan data ke Local Storage
  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Ambil data dari Local Storage berdasarkan key
  getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    // console.log("data get",data)
    return data ? (JSON.parse(data) as T) : null;
  }
  // tambah data
  saveSelectedProduct(product: ProductOrder): void {
    // this.setItem<AdminProduct>('selectedProduct', product);
    let products: ProductOrder[] = this.getItem<ProductOrder[]>('selectedProducts') || [];
    // Cek apakah produk sudah ada dalam daftar
    let existingProduct = products.find(p => p.id === product.id);

    if (existingProduct) {
      // Jika produk sudah ada, tambahkan quantity
      existingProduct.quantity = (existingProduct.quantity||0) + 1;
    } else {
      // Jika produk belum ada, set quantity = 1 dan tambahkan ke array
      product.quantity = 1;
      products.push(product);
    }
    this.setItem<ProductOrder[]>('selectedProducts', products);
    // console.log('Produk yang disimpan ke Local Storage:', product);
  }


  removeSelectedProduct(product: ProductOrder): void {
    let products: ProductOrder[] = this.getItem<ProductOrder[]>('selectedProducts') || [];
  
    // Cari produk dalam daftar
    let existingProductIndex = products.findIndex(p => p.id === product.id);
  
    if (existingProductIndex !==-1) {
      let existingProduct = products[existingProductIndex];
      if ((existingProduct.quantity || 0) <= 1) {
        // Jika quantity <= 1, hapus produk dari array
        products.splice(existingProductIndex, 1);
    } else {
        // Jika quantity lebih dari 1, kurangi quantity
        existingProduct.quantity= (existingProduct.quantity||0) - 1;
    }
  
      // Simpan kembali daftar produk ke local storage
      this.setItem<ProductOrder[]>('selectedProducts', products);
    }
  }
  

   // Ambil semua produk yang tersimpan
   getSavedProducts(): any {
    return this.getItem<ProductOrder[]>('selectedProducts') || [];
  }

  // Hapus item dari Local Storage berdasarkan key
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Hapus semua data di Local Storage
  clear(): void {
    localStorage.clear();
  }
}
