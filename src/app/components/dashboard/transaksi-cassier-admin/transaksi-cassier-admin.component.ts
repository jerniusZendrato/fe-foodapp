import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { OrderViewAdmin } from 'src/app/models/order-view-admin.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/service/category.service';
import { LoaderService } from 'src/app/service/loader.service';
import { OrderAdminService } from 'src/app/service/order-admin.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-transaksi-cassier-admin',
  templateUrl: './transaksi-cassier-admin.component.html',
  styleUrls: ['./transaksi-cassier-admin.component.css']
})
export class TransaksiCassierAdminComponent implements OnInit {
  ngOnInit(): void {
  this.getorderview()
  this.loadcategory()
  this.groupProductsByCategory()
  this.loadproducts()
    
  }
  constructor(
    private orderadmin: OrderAdminService,
    private loaderService: LoaderService,
    private productservice: ProductService,
    private categoryservice: CategoryService

  ){}

  public orderview: OrderViewAdmin[] = []
  public orderprocess: OrderViewAdmin[] = []
  public orderdeliverd: OrderViewAdmin[] = []

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
  }

  getorderview(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.loaderService.show();
      this.orderadmin.getorder().subscribe(
        (Response: OrderViewAdmin[]) => {
          if (Response) {
            const tanggalSekarang: string = new Date().toISOString().split('T')[0];
             // Filter hanya order yang dibuat hari ini
             
            this.orderview = Response.filter(order => {
              if (order.createdAt) {
                const createdAtDate = new Date(order.createdAt).toISOString().split('T')[0];
                return createdAtDate === tanggalSekarang;
              }
              return false;
            });

            // memasukkan status prosess ke orderprocess
            this.orderprocess = Response.filter(order =>{
              if (order.createdAt && order.status) {
                const createdAtDate = new Date(order.createdAt).toISOString().split('T')[0];
                return createdAtDate === tanggalSekarang && order.status.toLowerCase() === 'process';
              }
              return false;
            });

            // memasukkan status deliverd ke orderdeliverd
            this.orderdeliverd = Response.filter(order => {
              if (order.createdAt && order.status) {
                const createdAtDate = new Date(order.createdAt).toISOString().split('T')[0];
                return createdAtDate === tanggalSekarang && order.status.toLowerCase() === 'deliverd';
              }
              return false;
            });
            this.loaderService.hideWithDelay(1000);
            resolve();

            
          }
          else
            console.log("data tidak isSuccess=true")
            this.loaderService.hideWithDelay(1000);
          reject()
        }

      )
    })
  }

  addneworder = false;
  moveaddorder() {
    this.addneworder = !this.addneworder; // Toggle status
    
  }

  public datacategory: Category[] = []

  loadcategory(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.loaderService.show();
      this.categoryservice.getcategory().subscribe(
        (Response: Category[]) => {
          if (Response) {
            this.datacategory = Response
            console.log("ini category", this.datacategory)
            // this.groupProductsByCategory()
            this.loaderService.hideWithDelay(1000);
            resolve();
          }
          else
            console.log("data tidak isSuccess=true")
            this.loaderService.hideWithDelay(1000);
          reject()
        }

      )
    })
  }




  // menu Add new Order

  // add product
  loadproducts(): Promise<void> {
    return new Promise((resolve, reject) => {
    this.productservice.getproduct().subscribe(
      (Response: Product[]) => {
        if (Response) {
          this.products = Response
          console.log(this.products, "this producttt")
          this.groupProductsByCategory()
          resolve();
        }
        else
          console.log("data tidak isSuccess=true")
          reject()
      }
    )
  })
}

  // categories: any[] = [];
  public products: Product[] = []
  public groupedProducts: { [key: string]: Product[] } = {};

  groupProductsByCategory(): void {

    const activeCategories = this.datacategory
    .filter(category => category.activated)
    .map(category => category.name);

    // cek apakah di roduct memiliki kategory aktif 
    // jika ia maka masukkan data tersebut ke filteredProducts
    const filteredProducts = activeCategories.length > 0
    ? this.products.filter(product => product.category && activeCategories.includes(product.category))
    : [];

    console.log("filteredProducts",filteredProducts)
    this.groupedProducts = filteredProducts.reduce((grouped: any, product: any) => {
      (grouped[product.category] = grouped[product.category] || []).push(product);
      return grouped;
      
    }, {})
    console.log (" this.groupedProducts", this.groupedProducts)
    
    ;}



}
