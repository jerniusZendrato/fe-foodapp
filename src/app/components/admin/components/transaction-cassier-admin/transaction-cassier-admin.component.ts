import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { OrderAdminService } from '../../services/order-admin.service';
import { AdminOrderCassier } from '../../models/admin-order-cassier.model';
import { AdminCategory } from '../../models/admin-category.model';
import { AdminProduct } from '../../models/admin-product.model';

@Component({
  selector: 'app-transaction-cassier-admin',
  templateUrl: './transaction-cassier-admin.component.html',
  styleUrls: ['./transaction-cassier-admin.component.css']
})
export class TransactionCassierAdminComponent implements OnInit {
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

  public orderview: AdminOrderCassier[] = []
  public orderprocess: AdminOrderCassier[] = []
  public orderdeliverd: AdminOrderCassier[] = []

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
        (Response: AdminOrderCassier[]) => {
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

  public datacategory: AdminCategory[] = []

  loadcategory(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.loaderService.show();
      this.categoryservice.getcategory().subscribe(
        (Response: AdminCategory[]) => {
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
      (Response: AdminProduct[]) => {
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
  public products: AdminProduct[] = []
  public groupedProducts: { [key: string]: AdminProduct[] } = {};

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

